import { Injectable } from '@angular/core';
import { ExtendedSearchParams, SearchParamsService } from '@knora/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeolService {

    apiUrl = environment.api;
    externalApiURL = environment.externalApiURL;

    constructor(private _searchParamsService: SearchParamsService, private _router: Router) {
    }

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
    PREFIX biblio: <${this.externalApiURL}/ontology/0801/biblio/simple/v2#>
    PREFIX beol: <${this.externalApiURL}/ontology/0801/beol/simple/v2#>

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
    PREFIX beol: <${this.externalApiURL}/ontology/0801/beol/simple/v2#>

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
    PREFIX beol: <${this.externalApiURL}/ontology/0801/beol/simple/v2#>
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
     * Given the repertorium number of a letter from LEOO, searches for that letter.
     *
     * @param repertoriumNumber the repertorium number to search for.
     * @param originalLanguage indicates if the original language or the translation should be searched for.
     * @returns the Gravsearch query.
     */
    searchForLetterFromLEOO(repertoriumNumber: string): string {

        const letterByNumberTemplate = `
        PREFIX beol: <${this.externalApiURL}/ontology/0801/beol/simple/v2#>
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
     * Chooses the apt route to display a resource, depending on its type.
     *
     * @param referredResourceType the type of the referred resource.
     * @param referredResourceIri the Iri of the referred resource.
     */
    routeByResourceType(referredResourceType: string, referredResourceIri: string): void {

        if (referredResourceType === this.externalApiURL + '/ontology/0801/beol/v2#person') {
            // route to person template
            this._router.navigateByUrl('person/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#Publisher')  {
            // route to publisher template
            this._router.navigateByUrl('publisher/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this.externalApiURL + '/ontology/0801/beol/v2#letter') {
            // route to letter template
            this._router.navigateByUrl('letter/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this.externalApiURL + '/ontology/0801/beol/v2#endnote') {
            // route to letter template
            this._router.navigateByUrl('endnote/' + encodeURIComponent(referredResourceIri));
        } else if (referredResourceType === this.externalApiURL + '/ontology/0801/beol/v2#figure') {
            // route to letter template
            this._router.navigateByUrl('figure/' + encodeURIComponent(referredResourceIri));
        } else if (
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#Book' ||
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#EditedBook' ||
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#CollectionArticle' ||
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#Collection' ||
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#Journal' ||
            referredResourceType === this.externalApiURL + '/ontology/0801/biblio/v2#JournalArticle') {
            // route to biblio-items template
            this._router.navigateByUrl('biblio/' + encodeURIComponent(referredResourceIri));
        } else {
            // route to generic template
            this._router.navigateByUrl('resource/' + encodeURIComponent(referredResourceIri));
        }

    }
}
