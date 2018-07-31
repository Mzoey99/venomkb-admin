<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="Species " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>
            <div>
                <b-form >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Venomkb id"
                                            label-for="venomkb_id">
                                <b-form-input id="venomkb_id"
                                            type="text"
                                            v-model="species.venomkb_id"
                                            required
                                            placeholder="S2109813">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Name:"
                                            label-for="exampleInput2">
                                <b-form-input id="exampleInput2"
                                            type="text"
                                            v-model="species.name"
                                            required
                                            placeholder="Protobothrops mucrosquamatus">
                                </b-form-input>
                            </b-form-group>
                        </div>
                         <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Venom ref"
                                            label-for="venomkb_ref">
                                <b-form-input id="venomkb_ref"
                                            type="text"
                                            v-model="species.venom_ref"
                                            required
                                            placeholder="V2109813">
                                </b-form-input>
                            </b-form-group>
				        </div>
                    </b-row>
                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Annotation score:"
                                            label-for="exampleInput2">
                                <b-form-input id="exampleInput2"
                                            type="number"
                                            v-model="species.annotation_score"
                                            required
                                            placeholder="5">
                                </b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Common Name:"
                                            label-for="common_name">
                                <b-form-input id="common_name"
                                            type="text"
                                            v-model="species.common_name"
                                            placeholder="Taiwan habu">
                                </b-form-input>
                            </b-form-group>
                        </div>
                        
                         <div class="col md">
                            <b-form-group label="Image url:"
                                            label-for="species_image_url">
                                <b-form-input id="species_image_url"
                                            type="text"
                                            v-model="species.species_image_url"
                                            placeholder="http://www.rcsb.org/pdb/images/1BQY_bio_r_250.jpg">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Venom name:"
                                            label-for="Venom_name">
                                <b-form-input id="venom_name"
                                            type="text"
                                            v-model="species.venom.name">
                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Proteins list:"
                                            label-for="Proteins_list">
                                <v-multiple-select :list="protein_options"
                                        optionValue="venomkb_id"
                                        optionText="name"
                                        :selectedItems="species_proteins"
                                        @select="onSelect"
                                        @searchchange="onSearch">
                                </v-multiple-select>
                            </b-form-group>
                        </div>
                        <div class="col-md">
                        </div>
                    </b-row>
                   
                <b-button @click="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
            </div>
		</b-container>
	</b-card>

    <b-card border-variant="primary"
			header="Out links " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>

            <b-card v-for="(out_link, index) in out_links" :key="out_link.primary_id">
                <b-form @submit="onSubmit" >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Resource"
                                            label-for="resource">
                                <b-form-input id="resource"
                                            type="text"
                                            v-model="out_link.resource"
                                            required
                                            placeholder="P:defense response">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Primary id"
                                            label-for="primary_id">
                                <b-form-input id="primary_id"
                                            type="text"
                                            v-model="out_link.primary_id"
                                            required
                                            placeholder="GO:0005576">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Attribute"
                                            label-for="attribute">
                                <b-form-input id="project"
                                            type="text"
                                            v-model="out_link.attribute"
                                            placeholder="UniProtKB-SubCell">
                                </b-form-input>
                            </b-form-group>
                        </div>
                       
                    </b-row>
                <b-button @click="removeOutLink(index)" variant="danger">Remove</b-button>

                </b-form>
            </b-card>

            <div>
                <b-form>
                <b-button @click="addOutLink" variant="primary">Add a new out link</b-button>
                </b-form>
            </div>
		</b-container>

	</b-card>

  

    <b-card border-variant="primary"
			header="Taxonomic Lineage " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		<b-container fluid>

            <b-card v-for="(taxonomic_lineage, index) in taxonomic_lineages" :key="index">
                <b-form @submit="onSubmit" >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Taxon Name"
                                            label-for="taxon_name">
                                <b-form-input id="taxon_name"
                                            type="text"
                                            v-model="taxonomic_lineage.taxonName"
                                            required
                                            placeholder="Bilateria">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Itis Tsn"
                                            label-for="itis_tsn">
                                <b-form-input id="itis_tsn"
                                            type="text"
                                            v-model="taxonomic_lineage.itis_tsn"
                                            placeholder="914154">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Rank Name"
                                            label-for="rankName">
                                <b-form-input id="rankName"
                                            type="text"
                                            v-model="taxonomic_lineage.rankName"
                                            placeholder="Subkingdom">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                <b-button @click="removeTaxonomicLineage(index)" variant="danger">Remove</b-button>

                </b-form>
            </b-card>

            <div>
                <b-form>
                <b-button @click="addTaxonomicLineage" variant="primary">Add a new Taxonimic Lineage</b-button>
                </b-form>
            </div>
		</b-container>
	</b-card>
	 </b-container>

	</div>
</template>
<script>
export default {
	name: "species-form",
	props: {
		dataBackgroundColor: {
			type: String,
			default: ""
		},
		species_id: {
			type: String
		}
	},
	data() {
            return {
            species: {
                venom: {
                    name: "",
                    proteins: []
                }
            },
            species_proteins: [],
            out_links: [],
            taxonomic_lineages: [],
            api_proteins: [],
            protein_options: []
		};
    },
    created() {
        this.getSpecies();
        this.getProteins();
    },
    methods: {
        getSpecies() {
            this.$http
				.get("http://localhost:3001/species/"+ this.species_id , {})
				.then(response => {
					console.log(response.data);
                        this.species = response.data;
                        this.species_proteins = response.data.venom_proteins;
						this.out_links = this.species.out_links
						this.taxonomic_lineages = this.species.taxonomic_lineage
				});
        },
        getProteins() {
            this.$http
            .get("http://localhost:3001/proteins/index")
            .then(response => {
                this.protein_options = response.data;
            }).catch(err => {
                console.log(err);
            })
        },
        onSelect(items) {
            this.species_proteins = items;
        },
        async onSearch(search_string) {
            if (this.api_proteins.length === 0) {
                await this.getOutLinks()
            }
            this.protein_options = this.api_proteins.filter(element => {
                return element.name.toLowerCase().indexOf(search_string.toLowerCase()) > -1
            })
        },
        onSubmit() {
            alert(JSON.stringify(this.species));
        },
        addTaxonomicLineage() {
            this.taxonomic_lineages.push({
                taxonName: null,
                itis_tsn: null,
                rankName:null,
            })
        },
        addOutLink() {
            this.out_links.push({
                resource: null,
                primary_id: null,
                attribute: null
            })
        },
       

    
        removeOutLink(index) {
            this.out_links.splice(index, 1);
        },
     
        removeTaxonomicLineage(index) {
            this.taxonomic_lineages.splice(index, 1);
        },
        submit() {
            const send_object = {...this.species}

            send_object.venom.proteins = this.species_proteins.map(el => {
                return el.venomkb_id;
            })

            if (this.taxonomic_lineages > 0)
                send_object.taxonomic_lineages = this.taxonomic_lineages;

            if (this.out_links > 0) 
                send_object.out_links = this.out_links;
                
            console.log(send_object);
            
            this.$http.post("http://localhost:3001/species/update/"+ this.species_id , send_object)
            .then(response => {
                this.$router.push({
                    name: "Species"
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }
	
		
};
</script>
<style scoped>
p {
	font-size: 14px;
}
h6 {
	font-size : 0.75rem;
}
i.icon.delete:before {
    content: "\F00D";
}
</style>
