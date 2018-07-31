<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="Protein " 
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
                                            v-model="protein.venomkb_id"
                                            required
                                            disabled
                                           >
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Name:"
                                            label-for="exampleInput2">
                                <b-form-input id="exampleInput2"
                                            type="text"
                                            v-model="protein.name"
                                            required
                                            placeholder="Thrombin-like enzyme asperase">
                                </b-form-input>
                            </b-form-group>
                        </div>
                         <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Venom ref"
                                            label-for="venomkb_ref">
                                <b-form-input id="venomkb_ref"
                                            type="text"
                                            v-model="protein.venom_ref"
                                            required
                                            placeholder="V9104561">
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
                                            v-model="protein.annotation_score"
                                            required
                                            placeholder="5">
                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col md">
                            <b-form-group label="Pdb structure known :" label-for="pdbStructure">
                                <b-form-radio-group id="pdbStructure" v-model="protein.pdb_structure_known" :options="options" name="radioOpenions">
                                </b-form-radio-group>
                            </b-form-group>
                        </div>
                         <div class="col md">
                            <b-form-group label="Pdb image url:"
                                            label-for="imageUrl">
                                <b-form-input id="imageUrl"
                                            type="text"
                                            v-model="protein.pdb_image_url"
                                            placeholder="http://www.rcsb.org/pdb/images/1BQY_bio_r_250.jpg">
                                </b-form-input>
                            </b-form-group>
                        </div>
                        
                    </b-row>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea v-model="protein.description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">AA sequence</label>
                        <textarea v-model="protein.aa_sequence" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
               
                <b-button @click="submit" variant="success">Update</b-button>
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

            <b-card v-for="(out_link, index) in out_links" :key="index">
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
                       
                         <div class="col md">
                            <b-form-group label="Shared" label-for="shared">
                                <b-form-radio-group id="shared" v-model="out_link.shared" :options="options" name="radioOpenions">
                                </b-form-radio-group>
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
			header="Literature predications " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>

            <b-card v-for="(predication, index) in literature_predications" :key="index">
                <b-form @submit="onSubmit" >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="S name"
                                            label-for="s_name">
                                <b-form-input id="s_name"
                                            type="text"
                                            v-model="predication.s_name"
                                            required
                                            placeholder="Bothrops asper">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="S cui"
                                            label-for="s_cui">
                                <b-form-input id="s_cui"
                                            type="text"
                                            v-model="predication.s_cui"
                                            required
                                            placeholder="C0999141">
                                </b-form-input>
                            </b-form-group>
                        </div>
                         <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="S type"
                                            label-for="s_type">
                                <b-form-input id="s_type"
                                            type="text"
                                            v-model="predication.s_type"
                                            required
                                            placeholder="rept">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                     <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="O name"
                                            label-for="o_name">
                                <b-form-input id="o_name"
                                            type="text"
                                            v-model="predication.o_name"
                                            required
                                            placeholder="Snakes">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="O cui"
                                            label-for="o_cui">
                                <b-form-input id="o_cui"
                                            type="text"
                                            v-model="predication.o_cui"
                                            required
                                            placeholder="C0037382">
                                </b-form-input>
                            </b-form-group>
                        </div>
                         <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="O type"
                                            label-for="o_type">
                                <b-form-input id="o_type"
                                            type="text"
                                            v-model="predication.o_type"
                                            required
                                            placeholder="rept">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Predicate"
                                            label-for="predicate">
                                <b-form-input id="predicate"
                                            type="text"
                                            v-model="predication.predicate"
                                            required
                                            placeholder="ISA">
                                </b-form-input>
                            </b-form-group>
                        </div>
                       
                         <div class="col md">
                            <b-form-group label="Venomkb protein ref"
                                            label-for="vkb_protein_ref">
                                <b-form-input id="vkb_protein_ref"
                                            type="text"
                                            v-model="predication.vkb_protein_ref"
                                            placeholder="P1219123">
                                </b-form-input>
                            </b-form-group>
                        </div>

                         <div class="col md">
                            <b-form-group label="PMID"
                                            label-for="pmid">
                                <b-form-input id="pmid"
                                            type="number"
                                            v-model="predication.pmid"
                                            placeholder="17994164">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>

                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Toxprotid"
                                            label-for="toxprotid">
                                <b-form-input id="toxprotid"
                                            type="text"
                                            v-model="predication.toxprot_id"
                                            placeholder="Q072L6">
                                </b-form-input>
                            </b-form-group>
                        </div>
                       
                         <div class="col md">
                            <b-form-group label="PID"
                                            label-for="pid">
                                <b-form-input id="pid"
                                            type="text"
                                            v-model="predication.pid"
                                            placeholder="2627407">
                                </b-form-input>
                            </b-form-group>
                        </div>

                         <div class="col md">
                            <b-form-group label="SID"
                                            label-for="sid">
                                <b-form-input id="sid"
                                            type="text"
                                            v-model="predication.sid"
                                            placeholder="93466137">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                <b-button @click="removeLiteraturePredication(index)" variant="danger">Remove</b-button>

                </b-form>
            </b-card>

            <div>
                <b-form>
                <b-button @click="addLiteraturePredication" variant="primary">Add a new literature predication</b-button>
                </b-form>
            </div>
		</b-container>

	</b-card>

    <b-card border-variant="primary"
			header="Literature references " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>

            <b-card v-for="(reference, index) in literature_references" :key="index">
                <b-form @submit="onSubmit" >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Title"
                                            label-for="title">
                                <b-form-input id="title"
                                            type="text"
                                            v-model="reference.title"
                                            required
                                            placeholder="Cloning and characterization of Trimeresurus gracilis venom phospholipases A(2): comparison with Ovophis okinavensis venom and the systematic implications.">
                                </b-form-input>
                            </b-form-group>
				        </div>
                       
                    </b-row>
                    
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="First author"
                                            label-for="first_author">
                                <b-form-input id="first_author"
                                            type="text"
                                            v-model="reference.first_author"
                                            placeholder="Tsai I.-H.">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Date"
                                            label-for="date">
                                <b-form-input id="date"
                                            type="text"
                                            v-model="reference.date"
                                            placeholder="2012">
                                </b-form-input>
                            </b-form-group>
                        </div>
                         <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="PMID"
                                            label-for="pmid">
                                <b-form-input id="pmid"
                                            type="text"
                                            v-model="reference.pmid"
                                            placeholder="22115990">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                     <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Journal name"
                                            label-for="journal_name">
                                <b-form-input id="journal_name"
                                            type="text"
                                            v-model="reference.journal_name"
                                            required
                                            placeholder="Toxicon">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="doi"
                                            label-for="doi">
                                <b-form-input id="doi"
                                            type="text"
                                            v-model="reference.doi"
                                            required
                                            placeholder="10.1016/j.toxicon.2011.10.016">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Citation"
                                            label-for="citation">
                                <b-form-input id="citation"
                                            type="text"
                                            v-model="reference.citation"
                                            required
                                            placeholder="">
                                </b-form-input>
                            </b-form-group>
				        </div>
                       
                    </b-row>
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Authors"
                                            label-for="authors">
                                <b-form-input id="authors"
                                            type="text"
                                            v-model="reference.authors"
                                            required
                                            placeholder="">
                                </b-form-input>
                            </b-form-group>
				        </div>
                       
                    </b-row>
                <b-button  @click="removeLiteratureReference(index)" variant="danger">Remove</b-button>
                   
                </b-form>
            </b-card>

            <div>
                <b-form>
                <b-button @click="addLiteratureReference" variant="primary">Add a new literature references</b-button>
                </b-form>
            </div>
		</b-container>
	</b-card>

     <b-card border-variant="primary"
			header="GO annotation " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		<b-container fluid>

            <b-card v-for="(go_annotation, index) in go_annotations" :key="index">
                <b-form @submit="onSubmit" >
                    <b-row>
				        <div class="col-md">

                            <b-form-group id="exampleInputGroup1"
                                            label="Term"
                                            label-for="term">
                                <b-form-input id="term"
                                            type="text"
                                            v-model="go_annotation.term"
                                            required
                                            placeholder="P:defense response">
                                </b-form-input>
                            </b-form-group>
				        </div>
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Id"
                                            label-for="id">
                                <b-form-input id="id"
                                            type="text"
                                            v-model="go_annotation.id"
                                            required
                                            placeholder="GO:0005576">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                    <b-row>
				       
                        <div class="col md">
                            <b-form-group id="exampleInputGroup2"
                                            label="Project"
                                            label-for="project">
                                <b-form-input id="project"
                                            type="text"
                                            v-model="go_annotation.project"
                                            placeholder="UniProtKB-SubCell">
                                </b-form-input>
                            </b-form-group>
                        </div>
                       
                         <div class="col md">
                            <b-form-group label="Evidence"
                                            label-for="evidence">
                                <b-form-input id="evidence"
                                            type="text"
                                            v-model="go_annotation.evidence"
                                            placeholder="ECO:0000501">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>
                <b-button @click="removeGoAnnotation(index)" variant="danger">Remove</b-button>

                </b-form>
            </b-card>

            <div>
                <b-form>
                <b-button @click="addGoAnnotation" variant="primary">Add a new GO annotation</b-button>
                </b-form>
            </div>
		</b-container>
	</b-card>
	 </b-container>

	</div>
</template>
<script>
export default {
	name: "protein-form",
	props: {
		dataBackgroundColor: {
			type: String,
			default: ""
		},
		protein_id: {
			type: String
		}
	},
	data() {
            return {
            protein: {},
            options: [
                { text: 'True', value: 'true' },
                { text: 'False', value: 'false' },
            ],
            go_annotations: [],
            out_links: [],
            literature_predications: [],
            literature_references: []
		};
    },
    created() {
		  this.getProtein()
	  },
    methods: {
        getProtein() {
        this.$http
          .get("http://localhost:3001/proteins/"+ this.protein_id)
          .then(response => {
              // this.proteins = response.data
              this.protein = response.data
              this.go_annotations = this.protein.go_annotations
              this.out_links = this.protein.out_links
              this.literature_predications = this.protein.literature_predications
              this.literature_references = this.protein.literature_references
          });
        },
        onSubmit() {
            alert(JSON.stringify(this.protein));
        },
        addGoAnnotation() {
            this.go_annotations.push({
                term: null,
                id: null,
                project:null,
                evidence: null
            })
        },
        addOutLink() {
            this.out_links.push({
                resource: null,
                primary_id: null,
                shared: null
            })
        },
        addLiteraturePredication() {
            this.literature_predications.push({
                s_cui: null,
                s_type: null,
                predicate: null,
                o_name: null,
                o_cui: null,
                o_type: null,
                id_pred: null,
                vkb_protein_ref: null,
                pmid: null,
                toxprot_id: null,
                PID: null,
                SID: null
            })
        },
        addLiteratureReference() {
            this.literature_references.push({
                pmid: null,
                title: null,
                first_author: null,
                authors: null,
                journal_name: null,
                doi: null,
                citation: null,
                date: null,
            })
        },
        removeGoAnnotation(index) {
            this.go_annotations.splice(index, 1);
        },
        removeOutLink(index) {
            this.out_links.splice(index, 1);
        },
        removeLiteratureReference(index) {
            this.literature_references.splice(index, 1);
        },
        removeLiteraturePredication(index) {
            this.literature_predications.splice(index, 1);
        },
        submit() {
            const send_object = {...this.protein}

            if (this.go_annotations.length > 0)
                send_object.go_annotations = this.go_annotations;

            if (this.literature_predications > 0) 
                send_object.literature_predications = this.literature_predications;

            if (this.literature_references > 0)
                send_object.literature_references = this.literature_references;

            if (this.out_links > 0) 
                send_object.out_links = this.out_links;
                
            console.log(send_object);
            
            this.$http.post("http://localhost:3001/proteins/update/" + this.protein.venomkb_id, send_object)
            .then(response => {
                console.log(response);
                
                this.$router.push({
                    name: "Proteins"
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
</style>
