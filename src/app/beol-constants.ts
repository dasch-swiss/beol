export const beolProjectIri = 'http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF';
export const leibnizSolrApiBasePath = 'https://solr.leibniz.sub.uni-goettingen.de/solr/leibniz/';
export const leibnizDirectivePath = 'http://leibniz-briefportal.adw-goe.de/letter/';
export const newtonProjectIri = 'http://www.newtonproject.ox.ac.uk';
export const newtonDirectivePath = newtonProjectIri + '/view/texts/normalized/';
export const appName = 'BEOL | Bernoulli-Euler OnLine';
export const localData = 'data';
export const PAGING_LIMIT = 25;
export const startComponent = 'dasch';
export const TEI_INIT_CONFIG =  {
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#letter': {
                        'textProperty': 'http://0.0.0.0:3333/ontology/0801/beol/v2#hasText',
                            'mappingIRI': 'http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF/mappings/BEOLTEIMapping',
                            'gravsearchTemplateIri': 'http://rdfh.ch/0801/templateIri',
                            'teiHeaderXSLTIri': 'http://rdfh.ch/0801/headerIri'
                        }
                    };
