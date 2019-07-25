import { Injectable } from '@angular/core';
import {
    ExtendedSearchParams,
    KnoraConstants,
    ReadLinkValue, ReadResource,
    ReadResourcesSequence,
    ResourceService,
    SearchParamsService, SearchService
} from '@knora/core';
import { Router } from '@angular/router';
import { AppInitService } from '../app-init.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BeolService {

    constructor(
        private _searchParamsService: SearchParamsService,
        private _router: Router,
        private _resourceService: ResourceService,
        private _searchSerice: SearchService,
        private _appInitService: AppInitService
    ) {}

    /**
     * Given the ISBN, returns the Gravsearch to search for the book.
     *
     * @param isbn the book's ISBN.
     * @param sectionTitle the title to display describing the book.
     * @returns Gravsearch query.
     */
    searchForBookByTitle(isbn: string, sectionTitle: string): string {

        const bookTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX biblio: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/biblio/simple/v2#>
    PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>

    CONSTRUCT {

        ?introSection knora-api:isMainResource true .

    } WHERE {

        ?book a knora-api:Resource .

        ?book a biblio:Book .

        ?book biblio:bookHasISBN ?propVal0 .
        biblio:bookHasISBN knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
        ?propVal0 a <http://www.w3.org/2001/XMLSchema#string> .

        FILTER(?propVal0 = "${isbn}"^^<http://www.w3.org/2001/XMLSchema#string>)

        ?book biblio:bookHasContent ?content .

        biblio:bookHasContent knora-api:objectType knora-api:Resource .
        ?content a knora-api:Resource .

        ?content biblio:hasIntroduction ?intro .

        biblio:hasIntroduction knora-api:objectType knora-api:Resource .
        ?intro a knora-api:Resource .

        ?intro beol:hasSection ?introSection .
        beol:hasSection knora-api:objectType knora-api:Resource .
        ?introSection a knora-api:Resource .

        ?introSection beol:sectionHasTitle ?sectionTitle .

        beol:sectionHasTitle knora-api:objectType xsd:string .
        ?sectionTitle a xsd:string .

        FILTER(?sectionTitle = "${sectionTitle}")

    }

    OFFSET 0
        `;

        return bookTemplate;

    }


    /**
     * Given the ID, returns the Gravsearch to search for the book's introduction.
     *
     * @param id the id to display describing the introduction.
     * @returns Gravsearch query.
     */
    searchForIntroductionById(id: string): string {

        const introTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>

    CONSTRUCT {

        ?introSection knora-api:isMainResource true .

    } WHERE {

        ?introSection a beol:section .
      	?introSection a knora-api:Resource .
        ?introSection beol:beolIDs ?sectionId .

        beol:beolIDs knora-api:objectType xsd:string .
        ?sectionId a xsd:string .

        FILTER(?sectionId = "${id}")

    }

    OFFSET 0
        `;

        return introTemplate;

    }


    /**
     * Creates the Gravsearch needed for the search for the correspodence between two persons, ordered by date.
     *
     * @param gnd1 the GND/IAF identifier for the first correspondent.
     * @param gnd2 the GND/IAF identifier for the second correspondent.
     * @param noTranslations indicates if the letter is in original language (not a translation).
     * @param offset the offset to be used.
     */
    searchForCorrespondence(gnd1: string, gnd2: string, noTranslations: boolean = false, offset: number = 0): string {

        let language = '';

        if (noTranslations) {
            // original language: must have the property: beol:letterHasTranslation

            language = `
    ?letter beol:letterHasTranslation ?translation .

    beol:letterHasTranslation knora-api:objectType knora-api:Resource .
    ?translation a knora-api:Resource .

            `;
        } else {
            // translation: must not have the property: beol:letterHasTranslation

            language = `

    FILTER NOT EXISTS {
        ?letter beol:letterHasTranslation ?translation .
    }

    beol:letterHasTranslation knora-api:objectType knora-api:Resource .
    ?translation a knora-api:Resource .

            `;

        }

        const correspondenceTemplate = `
    PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

    CONSTRUCT {
        ?letter knora-api:isMainResource true .

        ?letter beol:creationDate ?date .

        ?letter ?linkingProp1  ?person1 .

        ?letter ?linkingProp2  ?person2 .

    } WHERE {
        ?letter a knora-api:Resource .
        ?letter a beol:letter .

        ${language}

        ?letter beol:creationDate ?date .

        beol:creationDate knora-api:objectType knora-api:Date .
        ?date a knora-api:Date .

        ?letter ?linkingProp1  ?person1 .

        ?linkingProp1 knora-api:objectType knora-api:Resource .
        FILTER(?linkingProp1 = beol:hasAuthor || ?linkingProp1 = beol:hasRecipient )

        ?person1 a beol:person .
        ?person1 a knora-api:Resource .

        ?person1 beol:hasIAFIdentifier ?gnd1 .
        FILTER(?gnd1 = "${gnd1}")

        ?gnd1 a xsd:string .

        ?letter ?linkingProp2 ?person2 .
        ?linkingProp2 knora-api:objectType knora-api:Resource .

        FILTER(?linkingProp2 = beol:hasAuthor || ?linkingProp2 = beol:hasRecipient )

        ?person2 a beol:person .
        ?person2 a knora-api:Resource .

        ?person2 beol:hasIAFIdentifier ?gnd2 .
        FILTER(?gnd2 = "${gnd2}")

        ?gnd2 a xsd:string .

        beol:hasIAFIdentifier knora-api:objectType xsd:string .

    } ORDER BY ?date
`;

        // offset component of the Gravsearch query
        const offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset: number): string => {
            const offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return correspondenceTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }

        // console.log(correspondenceTemplate + offsetTemplate);

        return correspondenceTemplate + offsetTemplate;
    }

    /**
     * Creates the Gravsearch needed for the search for the newton correspodence.
     */
    searchForNewtonCorrespondence(offset: number = 0): string {

        const correspondenceTemplate = `
            PREFIX newton: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/newton/simple/v2#>
            PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

            CONSTRUCT {
                ?letter knora-api:isMainResource true .

            } WHERE {

                ?letter a knora-api:Resource .
                ?letter a newton:letter .

            }
        `;


        // offset component of the Gravsearch query
        const offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset: number): string => {
            const offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return correspondenceTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return correspondenceTemplate + offsetTemplate;
    }

    /**
     * Creates the Gravsearch needed for the search for the newton correspodence.
     */
    searchForLeibnizCorrespondence(offset: number = 0): string {

        const correspondenceTemplate = `
            PREFIX leibniz: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/leibniz/simple/v2#>
            PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

            CONSTRUCT {
                ?letter knora-api:isMainResource true .

            } WHERE {

                ?letter a knora-api:Resource .
                ?letter a leibniz:letter .

            }
        `;


        // offset component of the Gravsearch query
        const offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset: number): string => {
            const offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return correspondenceTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return correspondenceTemplate + offsetTemplate;
    }
        /**
     * Given the repertorium number of a letter from LEOO, searches for that letter.
     *
     * @param repertoriumNumber the repertorium number to search for.
     * @returns the Gravsearch query.
     */
    searchForLetterFromLEOO(repertoriumNumber: string): string {

        const letterByNumberTemplate = `
        PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {

            ?letter knora-api:isMainResource true .


        } WHERE {

            ?letter a knora-api:Resource .

            ?letter a beol:letter .

            ?letter beol:letterHasRepertoriumNumber ?letterNumber .
            beol:letterHasRepertoriumNumber knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
            ?letterNumber a <http://www.w3.org/2001/XMLSchema#string> .

            FILTER(?letterNumber = "${repertoriumNumber}"^^<http://www.w3.org/2001/XMLSchema#string>)

        }

        OFFSET 0
        `;

        return letterByNumberTemplate;

    }

    /**
     * Given a region Iri, returns the Gravsearch query to obtain the associated transcription Iri.
     *
     * @param regionIri Iri of the region.
     * @param offset offset to be used.
     * @returns the Gravsearch query to get the transcription Iris.
     */
    getTranscriptionIriForRegion(regionIri: string, offset: number = 0) {

        const transcriptionIriForPage = `
        PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
            ?transcription knora-api:isMainResource true .
        } WHERE {
            ?transcription beol:belongsToRegion <${regionIri}> .
        }

        OFFSET ${offset}
        `;

        return transcriptionIriForPage;
    }

    /**
     * Given a manuscript entry Iri, get the transcriptions that point to this manuscript entry.
     *
     * @param manuscriptEntryIri Iri of the manuscript entry.
     * @param excludeLayer layer to be excluded.
     * @param excludeLayer0 if set to true, layer 0 is ignored.
     * @param offset offset to be used.
     * @returns the Gravsearch query to get the manuscript entries.
     */
    getTranscriptionsForManuscriptEntry(manuscriptEntryIri: string, excludeLayer: number, excludeLayer0 = false, offset: number = 0) {

        let excludeLayer0filter = '';

        if (excludeLayer0) {
            excludeLayer0filter = `FILTER(?layer > 0)`;
        }

        const transcriptionsForManuscriptEntry = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        CONSTRUCT {

            ?trans knora-api:isMainResource true .

        } WHERE {

            ?trans a knora-api:Resource .

            ?trans a <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#transcription> .
            
            ?trans <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#transcriptionOf> <${manuscriptEntryIri}> .
            
            ?trans <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#layer> ?layer .
            
            FILTER(?layer != ${excludeLayer})

            ${excludeLayer0filter}    
        }

        ORDER BY ?layer 
        OFFSET ${offset}
        `;

        return transcriptionsForManuscriptEntry;
    }

    getTitleRegionTranscriptionForManuscriptEntry(manuscriptEntryIri: string, offset: number = 0) {

        const titleRegionTranscriptionsForManuscriptEntry = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        CONSTRUCT {

            ?trans knora-api:isMainResource true .

        } WHERE {

            ?trans a knora-api:Resource .

            ?trans a <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#transcription> .
            
            ?trans <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#transcriptionOf> <${manuscriptEntryIri}> .
            
            ?trans <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#belongsToRegion> ?region .
            
            ?region knora-api:hasComment ?title .
            
            FILTER(regex(?title, '01-TT'))

           
        }

        
        OFFSET ${offset}
        `;

        return titleRegionTranscriptionsForManuscriptEntry;

    }

    /**
     * Routes to the page a region belongs to, submitting the Iri of the region.
     *
     * @param regionIri the region to be displayed on the page it belongs to.
     */
    routeToPageWithActiveRegion(regionIri: string) {
        const isRegionOfValueProp = 'http://api.knora.org/ontology/knora-api/v2#isRegionOfValue';

        this._resourceService.getReadResource(regionIri).subscribe(
            (regionRes: ReadResourcesSequence) => {

                if (regionRes.numberOfResources === 1 && regionRes.resources[0].type === KnoraConstants.Region
                    && Array.isArray(regionRes.resources[0].properties[isRegionOfValueProp])
                    && regionRes.resources[0].properties[isRegionOfValueProp].length === 1) {

                    const regionOfVal: ReadLinkValue = <ReadLinkValue> regionRes.resources[0].properties[isRegionOfValueProp][0];

                    if (regionOfVal.referredResource !== undefined) {
                        const pageIri = regionOfVal.referredResource.id;
                        const page = regionOfVal.referredResource.type;

                        // refer directly to page template, indicating the active region
                        this._router.navigateByUrl('page/' + encodeURIComponent(pageIri) + '/' + encodeURIComponent(regionRes.resources[0].id));
                    } else {
                        console.error(`Could not route region ${regionIri} to page`);
                    }
                } else {
                    console.error(`Could not route region ${regionIri} to page`);
                }
            }
        );
    }

    /**
     * Generates a Gravsearch query that gets the given region's geometry value and the file value of the image it points to.
     *
     * @param regionIri the Iri of the region whose geometry and related file value should be retrieved.
     * @return Gravsearch string.
     */
    private getRegionDimensionsAndPageQuery(regionIri: string): string {

        const regionDimsTemplate = `
    PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  

    CONSTRUCT {
       ?region knora-api:isMainResource true .
		
       ?region knora-api:hasGeometry ?geometry .  

       ?region knora-api:isRegionOf ?page .
       
       ?page knora-api:hasStillImageFile ?file .

    } WHERE {
       BIND(<${regionIri}> AS ?region)
 
 	   ?region knora-api:hasGeometry ?geometry . 
 
       ?region knora-api:isRegionOf ?page .
        
       ?page knora-api:hasStillImageFile ?file .
       
    } OFFSET 0
        `;

        return regionDimsTemplate;
    }

    /**
     * Searches for the given region's geometry value and related file value.
     *
     * @param regionIri the Iri of the region whose geometry and related file value should be retrieved.
     * @return the region resource with the geometry value and the related file value.
     */
    getRegionDimsAndFile(regionIri: string): Observable<ReadResourcesSequence> {

        const gravsearch = this.getRegionDimensionsAndPageQuery(regionIri);

        return this._searchSerice.doExtendedSearchReadResourceSequence(gravsearch);

    }

    /**
     * Given the title of a letter from BEBB, searches for that letter.
     *
     * @param title the title of the BEBB letter to search for.
     * @returns the Gravsearch query.
     */
    searchForLetterFromBEBB(title: string): string {

        const letterByTitleTemplate = `
        PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {

            ?letter knora-api:isMainResource true .


        } WHERE {

            ?letter a knora-api:Resource .

            ?letter a beol:letter .

            ?letter beol:title ?title .
            beol:title knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
            ?title a <http://www.w3.org/2001/XMLSchema#string> .

            FILTER(?title = "${title}"^^<http://www.w3.org/2001/XMLSchema#string>)

        }

        OFFSET 0
        `;

        return letterByTitleTemplate;

    }

    /**
     * Given the Iri of a compound object and the sequence number of the current part, returns the previous and next part.
     *
     * @param compoundIri the Iri of the compound object the current part belongs to.
     * @param currentSeqnum the sequence number of the current part.
     */
    getPreviousAndNextPartOfCompound(compoundIri: string, currentSeqnum: number): string {

        const pageTemplate = `
        PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {

            ?page knora-api:isMainResource true .


        } WHERE {

            ?page knora-api:isPartOf <${compoundIri}> .

            ?page knora-api:seqnum ?seqnum .

            FILTER(?seqnum = ${currentSeqnum - 1} || ?seqnum = ${currentSeqnum + 1})

        }

        ORDER BY ?seqnum
        OFFSET 0
        
        `;


        return pageTemplate;
    }

    /**
     * Given the Iri of a manuscript, generates a Gravsearch query to get all its entries sortedby sequence number.
     *
     * @param manuscriptIri the Iri of the manuscript.
     * @param offset the offset to be used.
     */
    getEntriesForManuscript(manuscriptIri: string, offset: number = 0): string {

        const manuscriptEntriesTemplate = `
        PREFIX beol: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/beol/simple/v2#>
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {

            ?entry knora-api:isMainResource true .

        } WHERE {

            ?entry beol:manuscriptEntryOf <${manuscriptIri}> .

            ?entry beol:seqnum ?seqnum .

        }

        ORDER BY ?seqnum
        
        `;

        // offset component of the Gravsearch query
        const offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset: number): string => {
            const offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return manuscriptEntriesTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return manuscriptEntriesTemplate + offsetTemplate;

    }

    /**
     * Chooses the apt route to display a resource, depending on its type.
     *
     * @param referredResourceType the type of the referred resource.
     * @param referredResourceIri the Iri of the referred resource.
     */
    routeByResourceType(referredResourceType: string, referredResourceIri: string): void {

       if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#person') {
            // route to person template
            this._router.navigateByUrl('person/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#Publisher') {
            // route to publisher template
            this._router.navigateByUrl('publisher/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letter') {
            // route to letter template
            this._router.navigateByUrl('letter/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/newton/v2#letter') {
            this._router.navigateByUrl('newtonLetter/' + encodeURIComponent(referredResourceIri));
        } else if  (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/leibniz/v2#letter') {
            this._router.navigateByUrl('leibnizLetter/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#endnote') {
            // route to letter template
            this._router.navigateByUrl('endnote/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#figure') {
            // route to letter template
            this._router.navigateByUrl('figure/' + encodeURIComponent(referredResourceIri));
        } else if (
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#Book' ||
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#EditedBook' ||
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#CollectionArticle' ||
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#Collection' ||
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#Journal' ||
            referredResourceType === this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#JournalArticle') {
            // route to biblio-items template
            this._router.navigateByUrl('biblio/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI  + '/ontology/0801/beol/v2#page') {
            this._router.navigateByUrl('page/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === 'http://api.knora.org/ontology/knora-api/v2#Region') {
            // route region to page it belongs to
            this.routeToPageWithActiveRegion(referredResourceIri);
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI  + '/ontology/0801/beol/v2#transcription') {
            this._router.navigateByUrl('transcription/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI  + '/ontology/0801/beol/v2#entryComment') {
            this._router.navigateByUrl('entryComment/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI  + '/ontology/0801/beol/v2#manuscriptEntry') {
            this._router.navigateByUrl('manuscriptEntry/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this._appInitService.getSettings().ontologyIRI  + '/ontology/0801/biblio/v2#letter') {
           this._router.navigateByUrl('publishedLetter/' + encodeURIComponent(referredResourceIri));
        } else {
            // route to generic template
            this._router.navigateByUrl('resource/' + encodeURIComponent(referredResourceIri));
        }

    }
}
