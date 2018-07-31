<template>
 <div class="content">
	 <b-container fluid>
	<b-card border-variant="primary"
			header="systemic_effect " 
			header-bg-variant="primary"
			header-text-variant="white"
			>
		
		<b-container fluid>
			<b-row>
				<div class="col-md">
					<h6><b>Venomkb_id :</b></h6> <p>{{systemic_effect.venomkb_id}}</p>
				</div>
				<div class="col-md">
					<h6><b>Name :</b></h6> <p>{{systemic_effect.name}}</p>
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
							:items="systemic_effect.out_links"
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
			<h4 slot="header" class="text-white">Protein annotations</h4>
			<b-card-body>
				
				<!-- Main table element -->
				<b-table show-empty
								:hover="true"
								stacked="md"
								:items="systemic_effect.protein_annotations"
								:fields="fields_protein_annotations"
				>
					<template slot="protein_id" slot-scope="row">{{row.value}}</template>
					<template slot="eco_id" slot-scope="row">{{row.value}}</template>
					<template slot="out_links" slot-scope="row">{{row.value}}</template>
					
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
								:items="systemic_effect.literature_references"
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
								:items="systemic_effect.literature_predications"
								:fields="fields_predication"
				>
					<template slot="predicate" slot-scope="row">{{row.value}}</template>
					<template slot="s_name" slot-scope="row">{{row.value}}</template>
					<template slot="o_name" slot-scope="row">{{row.value}}</template>
					<template slot="vkb_systemic_effect_ref" slot-scope="row">{{row.value}}</template>
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
	name: "systemic_effect-form",
	props: {
		dataBackgroundColor: {
			type: String,
			default: ""
		},
		systemic_effect_id: {
			type: String
		}
	},
	data() {
		return {
			systemic_effect: {},
			fields_out_links: [
				{ key: 'resource', label: 'Resource' },
				{ key: 'primary_id', label: 'Primary id'},
				{ key: 'shared', label: 'Share', sortable: true },
				{ key: 'actions', label: 'Actions' }
			],
			fields_protein_annotations: [
				{ key: 'protein_id', label: 'Protein id' },
				{ key: 'eco_id', label: 'Eco Id'},
				{ key: 'out_links', label: 'Out Links'},
			],
			
		};
	},
	created() {
		this.getsystemic_effect();
	},
	methods: {
		getsystemic_effect() {
			this.$http
				.get(`http://localhost:3001/systemic-effects/` + this.systemic_effect_id)
				.then(response => {
					console.log(response.data);
					
					this.systemic_effect = response.data;
				})
				.catch(e => {
					this.errors.push(e);
				});
		},
		editsystemic_effect() {
			this.$router.push({
				name: "EditsystemicEffect",
				params: { systemic_effect_id: this.systemic_effect.venomkb_id }
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


