<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="Genome " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>
			<b-row>
				<div class="col-md">
					<h6><b>Venomkb_id :</b></h6> <p>{{genome.venomkb_id}}</p>
				</div>
				<div class="col-md">
					<h6><b>Name :</b></h6> <p>{{genome.name}}</p>
				</div>
				<div class="col-md">
					<h6><b>Species ref :</b></h6> <p>{{genome.species_ref}}</p>
				</div>
			</b-row>
			<b-row>
				<div class="col-md">
					<h6><b>Annotation score:</b></h6> <p>{{genome.annotation_score}}</p>	
				</div>
				<div class="col-md">
					<h6><b>Assembly Platform:</b></h6> <p>{{genome.assembly_platform}}</p>
				</div>
				<div class="col-md">
					<h6><b>Project Homepage:</b></h6> <p>{{genome.project_homepage}}</p>
				</div>
			</b-row>
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
							:items="genome.out_links"
							:fields="fields_out_links"
			>
				<template slot="resource" slot-scope="row">{{row.value}}</template>
				<template slot="primary_id" slot-scope="row">{{row.value}}</template>
				<template slot="attribute" slot-scope="row">{{row.value}}</template>
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
								:items="genome.literature_references"
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

	 </b-container>

	</div>
</template>
<script>
export default {
	name: "genome-form",
	props: {
		dataBackgroundColor: {
			type: String,
			default: ""
		},
		genome_id: {
			type: String
		}
	},
	data() {
		return {
			genome: {},
			fields_out_links: [
				{ key: 'resource', label: 'Resource' },
				{ key: 'primary_id', label: 'Primary id'},
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
		this.getGenome();
	},
	methods: {
		getGenome() {
			this.$http
				.get(`http://localhost:3001/genomes/` + this.genome_id)
				.then(response => {
					console.log(response.data);
					
					this.genome = response.data;
				})
				.catch(e => {
					this.errors.push(e);
				});
		},
		
	}
};
</script>
<style scoped>
p {
	font-size: 16px;
}
h6 {
	font-size : 16px;
}
</style>


