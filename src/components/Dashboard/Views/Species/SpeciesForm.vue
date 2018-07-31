<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="Species " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>
			<b-row>
				<div class="col-md">
					<h6><b>Venomkb_id :</b></h6> <p>{{species.venomkb_id}}</p>
				</div>
				<div class="col-md">
					<h6><b>Name :</b></h6> <p>{{species.name}}</p>
				</div>
				<div class="col-md">
					<h6><b>Venom ref :</b></h6> <p>{{species.venom_ref}}</p>
				</div>
			</b-row>
			<b-row>
				<div class="col-md">
					<h6><b>Annotation score:</b></h6> <p>{{species.annotation_score}}</p>	
				</div>
				<div class="col-md">
					<h6><b>Common name:</b></h6> <p>{{species.common_name}}</p>
				</div>
				<div class="col-md">
					<h6><b>Species image url:</b></h6> <p>{{species.species_image_url}}</p>
				</div>
			</b-row>
			<b-row>
				<div class="col-md">
					<h6><b>Venom name:</b></h6> <p>{{species.venom.name}}</p>
				</div>
				<div class="col-md">
				<h6>Proteins List</h6>
				<ul>
					<li style="display:inline" v-for="(value, item) in species.venom.proteins" :key="item">
						{{value}}
					</li>
				</ul>
				</div>
				<div class="col-md">
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
							:items="species.out_links"
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
			<h4 slot="header" class="text-white">Taxonomic Lineage</h4>
			<b-card-body>
				
				<!-- Main table element -->
				<b-table show-empty
								:hover="true"
								stacked="md"
								:items="species.taxonomic_lineage"
								:fields="fields_taxonomic_lineage"
				>
					<template slot="taxonName" slot-scope="row">{{row.value}}</template>
					<template slot="itis_tsn" slot-scope="row">{{row.value}}</template>
					<template slot="rankName" slot-scope="row">{{row.value}}</template>
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
			species: {},
			fields_out_links: [
				{ key: 'resource', label: 'Resource' },
				{ key: 'primary_id', label: 'Primary id'},
				{ key: 'actions', label: 'Actions' }
			],
			fields_taxonomic_lineage: [
				{ key: 'taxonName', label: 'Taxon Name' },
				{ key: 'itis_tsn', label: 'Itis tsn'},
				{ key: 'rankName', label: 'Rank Name'},
				{ key: 'actions', label: 'Actions' }
			],
		};
	},
	created() {
		this.getSpecies();
	},
	methods: {
		getSpecies() {
			this.$http
				.get(`http://localhost:3001/species/` + this.species_id)
				.then(response => {
					console.log(response.data);
					
					this.species = response.data;
				})
				.catch(e => {
					this.errors.push(e);
				});
		},
		editSpecies() {
			this.$router.push({
				name: "EditProtein",
				params: { species_id: this.species.venomkb_id }
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
	font-size: 16px;
}
h6 {
	font-size : 16px;
}
</style>


