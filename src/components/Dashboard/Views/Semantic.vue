<template>
  <div class="content">
                <b-row>
                    <b-col class="col-md-6">
                        <b-card>
                        <div class="semantic">
                            <div id="editor_holder">
                            </div>
                            <b-btn class="mt-3" variant="primary" block @click="submit">Submit</b-btn>
                        </div>
                        </b-card>
                    </b-col>
                    <b-col class="col-md-6">
                        <b-card>
                            <h4>The result is </h4>
                            <div v-for="(value, key) in result" :key="key">
                                <card>
                                    <ul class="horizontalList">
                                        <li v-for="(object_value, object_key) in value" :key="object_key">
                                            {{object_key}}: {{object_value}} 
                                        </li>
                                    </ul>  
                                </card>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
  </div>
</template>

<script>
import axios from "axios";
import EditProteinForm from "src/components/Dashboard/Views/Proteins/EditProteinForm.vue";
import Card from 'src/components/UIComponents/Cards/Card.vue'

const ontology_class_table = ["Protein","Species","Pfam","SystemicEffect", "OntologyClass","Genome","VenomSeqData","Predication"]
const properties_table = ["name","vkbid","score","UniProtKB_id","aa_sequence","eco_id","genes_up","genes_down","all"]
const attributes_table = ["attribute", "operator", "value"];
const operator_table = ["contains", "equals", "starts with", "ends with"];

const declare_subobject = {
    "title": "declare_subobject",
    "type": "object",
    "required": [
        "attribute",
        "value",
        "operator"
    ],
    "properties": {
        "attribute": {
            "type": "string",
            "enum": properties_table,
            "default": "name"
        },
        "value": {
            "type": "string",
            "default": "phospholipase"
        },
        "operator": {
            "type": "string",
            "enum": operator_table,
            "default": "contains"
        }
    }
}

const declare_subarray = {
    "type": "object",
    "properties": {
        "Ontology Class": {
            "type": "string",
            "enum": ontology_class_table,
            "default": "Protein"
        },
        "Constraints": {
            "type": "array",
            "format": "table",
            "uniqueItems": true,
            "items": declare_subobject
        }
    }
}

const declare_array = {
    "type": "array",
    "title": "Declare",
    "format": "table",
    "uniqueItems": true,
    "items": declare_subarray
}

const distinct_count_object = {
    "type": "object",
    "properties": {
        "attribute": {
            "type": "string",
            "enum": properties_table,
            "default": null
        },
        "class": {
            "type": "string",
            "enum": ontology_class_table,
            default: null
        }
    }
}

const sort_string = {
    "type": "string",
    "enum": [
        "desc",
        "asc",
        null
    ],
    "default": null
}

const limit_number = {
    "type": "integer",
    "default": null
}

const aggregate_object = {
    "type": "object",
    "title": "Aggregate",
    "properties": {
        "count": distinct_count_object,
        "distinct": distinct_count_object,
        "sort": sort_string,
        "limit": limit_number
    }
}

const select_array = {
    "type": "array",
    "format": "table",
    "title": "Select",
    "uniqueItems": true,
    "items": {
        "type": "object",
        "title": "Select",
        "properties": {
            "Ontology Class": {
                "type": "string",
                "enum": ontology_class_table,
                "default": "Protein"
            },
            "Attribute": {
                "type": "string",
                "enum": properties_table,
                "default": "all"
            }
        },
        "default": [{
            "Ontology Class": "Protein",
            "Attribute": "name"
        }]
    }
}

export default {
	components: {
		EditProteinForm,
		Card
	},
	data() {
		return {
            data: {},
            result: []
		};
	},
	mounted() {
        // Set default options
        JSONEditor.defaults.options.theme = 'bootstrap4';

        // Initialize the editor
        var editor = new JSONEditor(document.getElementById("editor_holder"),{
        schema: {
            "title": "Semantic API Query",
            "type": "object",
            "required": [
                "select",
                "declare"
            ],
            "properties": {
                "select": select_array,
                "declare": declare_array,
                "aggregate": aggregate_object,
            }
        },

        no_additional_properties: true,
        disable_array_reorder: true,
        disable_edit_json: true,
        disable_properties: true,
        prompt_before_delete: false,
        iconlib: "fontawesome4"
        });

        // Get the value
        var data = editor.getValue();
        console.log(data); // "John Smith"

        // Validate
        var errors = editor.validate();
        if(errors.length) {
        // Not valid
        }

        // Listen for changes
        editor.on("change", () => {
        // Do something...
            var data = editor.getValue();
            this.data = {};
            if (data.select) this.data.select = this.formatSelect(data.select);
            if (this.formatDeclare(data.declare)) this.data.declare = this.formatDeclare(data.declare);
            if (this.formatAggregate(data.aggregate)) this.data.aggregate = this.formatAggregate(data.aggregate);
        });
	},

	methods: {
        formatSelect(select_data) {
            const select_result = [];
            select_data.forEach(select_el => {
                if (select_el["Attribute"] === "all") {
                    select_result.push(select_el["Ontology Class"]);
                } else {
                    const object = {};
                    object[select_el['Ontology Class']] = select_el["Attribute"];
                    select_result.push(object);                
                }
            });
            return select_result;
        },
        formatDeclare(declare_data) {
            if (declare_data.length === 0) {
                return null;
            }
            const declare_result = {};
            declare_data.forEach(data => {
                declare_result[data["Ontology Class"]] = [];
                data["Constraints"].forEach(element => {
                    const object = {
                        "attribute": element.attribute,
                        "operator": element.operator,
                        "value": element.value
                    }
                    declare_result[data["Ontology Class"]].push(object);
                })
            })
            return declare_result;
        },
        formatAggregate(aggregate_data) {
            if (!aggregate_data.limit && aggregate_data.sort === "undefined" && aggregate_data.count.attribute === "undefined" && aggregate_data.count.class === "undefined" && aggregate_data.distinct.class === "undefined" && aggregate_data.distinct.class === "undefined") {
                return null;
            }
            const aggregate = {}
            if (aggregate_data.limit) aggregate.limit = aggregate_data.limit;
            if (!(aggregate_data.sort === "undefined")) aggregate.sort = aggregate_data.sort;
            if (!(aggregate_data.count.attribute === "undefined")) aggregate.count = {attribute: aggregate_data.count.attribute};
            if (!(aggregate_data.count.class === "undefined")) aggregate.count = {class: aggregate_data.count.class};
            if (!(aggregate_data.distinct.attribute === "undefined")) aggregate.distinct = {attribute: aggregate_data.distinct.attribute};
            if (!(aggregate_data.distinct.class === "undefined")) aggregate.distinct = {class: aggregate_data.distinct.class};
            console.log(aggregate);
            
            return aggregate;
        },
        submit() {
            this.$http.post("http://localhost:3001/semantic", this.data).then(response => {
                this.result = response.data;
                this.showSuccess();
            }).catch(err => {
                console.log(err);
                this.showError();
            })
        },
        showError() {
            const notification = {
                template: `<span> <b> Error during query ! </b> - Please check your form ...</span>`
            }
            this.notifyVue("top", "center", notification, "danger", "nc-simple-remove");
        },
        showSuccess() {
            const notification = {
                template: `<span> <b> Successful Query ! </b></span>`
            }
            this.notifyVue("top", "center", notification, "success", "nc-check-2");
        },
        notifyVue (verticalAlign, horizontalAlign, notification, color, icon) {
            this.$notifications.notify(
            {
                component: notification,
                icon: 'nc-icon ' + icon,
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: color
            })
        }
    }
};
</script>

<style scoped>
.btn.disabled {
	background-color: #6c757d;
}
</style>
