<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="Protein " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>
			<b-row>
				<div class="col-md">
					<h6><b>Venomkb_id :</b></h6> <p>{{protein.venomkb_id}}</p>
				</div>
				<div class="col-md">
					<h6><b>Name :</b></h6> <p>{{protein.name}}</p>
				</div>
				<div class="col-md">
					<h6><b>Venom ref :</b></h6> <p>{{protein.venom_ref}}</p>
				</div>
			</b-row>
			<b-row>
				<div class="col-md">
					<h6><b>Annotation score:</b></h6> <p>{{protein.annotation_score}}</p>	
				</div>
				<div class="col-md">
					<h6><b>Pdb structure known:</b></h6> <p>{{protein.pdb_structure_known}}</p>
				</div>
				<div class="col-md">
					<h6><b>Pdb image url:</b></h6> <p>{{protein.pdb_image_url}}</p>
				</div>
			</b-row>
		<h6><b>Description:</b></h6> <p>{{protein.description}}</p>
		<h6><b>Aa sequence:</b></h6> <p>{{protein.aa_sequence}}</p>
		</b-container>
	</b-card>

	<b-card no-body
	  border-variant="primary"
	  header-bg-variant="primary">
		<h4 slot="header" class="text-white">Out links</h4>
		<b-card-body>
			
			<!-- Main table element -->
			<b-table show-empty
							:hover="true"
							stacked="md"
							:items="protein.out_links"
							:fields="fields_out_links"
			>
				<template slot="resource" slot-scope="row">{{row.value}}</template>
				<template slot="primary_id" slot-scope="row">{{row.value}}</template>
				<template slot="actions" slot-scope="row">
					<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
					<b-button @click="edit(row.venomkb_id)" variant="primary" size="sm" class="mr-1">
						<i class="fa fa-edit"></i>
					</b-button>
					<b-button @click="delete(row.venomkb_id)" variant="danger" size="sm" class="mr-1">
						<i class="fa fa-times"></i>
					</b-button>
				</template>
			</b-table>
		</b-card-body>
	</b-card>

	<b-card no-body
		border-variant="primary"
		header-bg-variant="primary">
			<h4 slot="header" class="text-white">Go annotation</h4>
			<b-card-body>
				
				<!-- Main table element -->
				<b-table show-empty
								:hover="true"
								stacked="md"
								:items="protein.go_annotations"
								:fields="fields_go_annotations"
				>
					<template slot="term" slot-scope="row">{{row.value}}</template>
					<template slot="id" slot-scope="row">{{row.value}}</template>
					<template slot="project" slot-scope="row">{{row.value}}</template>
					<template slot="evidence" slot-scope="row">{{row.value}}</template>
					<template slot="actions" slot-scope="row">
						<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
						<b-button @click="edit(row.venomkb_id)" variant="primary" size="sm" class="mr-1">
							<i class="fa fa-edit"></i>
						</b-button>
						<b-button @click="delete(row.venomkb_id)" variant="danger" size="sm" class="mr-1">
							<i class="fa fa-times"></i>
						</b-button>
					</template>
				</b-table>
			</b-card-body>
	</b-card>

	<b-card no-body
		border-variant="primary"
		header-bg-variant="primary">
			<h4 slot="header" class="text-white">Literature references</h4>
			<b-card-body>
				
				<!-- Main table element -->
				<b-table show-empty
								:hover="true"
								stacked="md"
								:items="protein.literature_references"
								:fields="fields_reference"
				>
					<template slot="pmid" slot-scope="row">{{row.value}}</template>
					<template slot="title" slot-scope="row">{{row.value}}</template>
					<template slot="first_author" slot-scope="row">{{row.value}}</template>
					<template slot="authors" slot-scope="row">{{row.value}}</template>
					<template slot="journal_name" slot-scope="row">{{row.value}}</template>
					<template slot="doi" slot-scope="row">{{row.value}}</template>
					<template slot="citation" slot-scope="row">{{row.value}}</template>
					
				</b-table>
			</b-card-body>
	</b-card>

	<b-card no-body
		border-variant="primary"
		header-bg-variant="primary">
			<h4 slot="header" class="text-white">Literature prédications</h4>
			<b-card-body>
				
				<!-- Main table element -->
				<b-table show-empty
								:hover="true"
								stacked="md"
								:items="protein.literature_predications"
								:fields="fields_predication"
				>
					<template slot="predicate" slot-scope="row">{{row.value}}</template>
					<template slot="s_name" slot-scope="row">{{row.value}}</template>
					<template slot="o_name" slot-scope="row">{{row.value}}</template>
					<template slot="vkb_protein_ref" slot-scope="row">{{row.value}}</template>
					<template slot="actions" slot-scope="row">
						<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
						<b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
						Info modal
						</b-button>
						<b-button size="sm" @click.stop="row.toggleDetails">
						{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
						</b-button>
					</template>
					<template slot="row-details" slot-scope="row">
						<b-card>
							<div class="row">
								<div class="col-md-4" v-for="(value, key) in row.item" :key="key">
									<div>
										<h6><b>{{key}}:</b></h6> <p>{{value}}</p>	
									</div>
								</div>
							</div>
						</b-card>
					</template>
				</b-table>
			</b-card-body>
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
			fields_out_links: [
				{ key: 'resource', label: 'Resource' },
				{ key: 'primary_id', label: 'Primary id'},
				{ key: 'shared', label: 'Share', sortable: true },
				{ key: 'actions', label: 'Actions' }
			],
			fields_go_annotations: [
				{ key: 'term', label: 'Term' },
				{ key: 'id', label: 'Id'},
				{ key: 'project', label: 'Project'},
				{ key: 'evidence', label: 'Evidence' }
			],
			fields_predication: [
				{ key: 'predicate', label: 'Predicate' },
				{ key: 's_name', label: 'S name'},
				{ key: 'o_name', label: 'O name'},
				{ key: 'vkb_protein_ref', label: 'Protein ref' },
				{ key: 'actions', label: 'Actions' }

			],
			fields_reference: [
				{ key: 'pmid', label: 'Pmid' },
				{ key: 'title', label: 'Title'},
				{ key: 'first_author', label: 'First author'},
				{ key: 'authors', label: 'Authors' },
				{ key: 'journal_name', label: 'Journal name' },
				{ key: 'doi', label: 'Doi' },
				{ key: 'citation', label: 'Citation' }
			],
		};
	},
	created() {
		this.getProtein();
	},
	methods: {
		getProtein() {
			this.$http
				.get(`http://localhost:3001/proteins/` + this.protein_id)
				.then(response => {
					console.log(response.data);
					
					this.protein = response.data;
				})
				.catch(e => {
					this.errors.push(e);
				});
		},
		editProtein() {
			this.$router.push({
				name: "EditProtein",
				params: { protein_id: this.protein.venomkb_id }
			});
		},
		info (item, index, button) {
			this.modalInfo.title = `Row index: ${index}`
			this.modalInfo.content = JSON.stringify(item, null, 2)
			this.$root.$emit('bv::show::modal', 'modalInfo', button)
		},
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


