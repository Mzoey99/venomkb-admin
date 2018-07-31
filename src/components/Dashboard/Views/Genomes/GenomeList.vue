<template>
  <div class="content">
	  <b-container fluid>
	  <b-card no-body
	  border-variant="primary"
	  header-bg-variant="primary">
		<h4 slot="header" class="text-white">Genomes</h4>
	<b-card-body>
		<!-- User Interface controls -->
		<b-row>
			<b-col md="6" class="my-1">
				<b-form-group horizontal label="Filter" class="mb-0">
					<b-input-group>
						<b-form-input v-model="filter" placeholder="Type to Search" />
						
					</b-input-group>
				</b-form-group>
			</b-col>
			<b-col md="6" class="my-1">
				<b-form-group horizontal label="Per page" class="mb-0">
					<b-form-select :options="pageOptions" v-model="perPage" />
				</b-form-group>
			</b-col>
		</b-row>

		<!-- Main table element -->
		<b-table show-empty
						 :hover="true"
						 stacked="md"
						 :items="genomes"
						 :fields="fields"
						 :current-page="currentPage"
						 :per-page="perPage"
						 :filter="filter"
						 @filtered="onFiltered"
						 @row-clicked="onSelect"
		>
			<template slot="venomkb_id" slot-scope="row">{{row.value}}</template>
			<template slot="name" slot-scope="row">{{row.value}}</template>
			<template slot="annotation_score" slot-scope="row">{{row.value}}</template>
			<template slot="actions" slot-scope="row">
				<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
				<b-button @click="edit" variant="primary" size="sm" class="mr-1">
					<i class="fa fa-edit"></i>
				</b-button>
				<b-button @click="showAlert(row.item._id)" variant="danger" size="sm" class="mr-1">
					<i class="fa fa-times"></i>
				</b-button>
			</template>
		</b-table>

		<b-row>
			<b-col md="6" class="my-1">
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
			</b-col>
		</b-row>

	
     
	</b-card-body>
	  </b-card>
	</b-container>
  </div>
</template>

<script>
import axios from "axios";
import EditGenomeForm from "src/components/Dashboard/Views/Genomes/EditGenomeForm.vue";


export default {
	components: {
		EditGenomeForm
	},
	data() {
		return {
			genomes: [],
			fields: [
				{ key: 'venomkb_id', label: 'Venomkb Id' },
				{ key: 'name', label: 'Name', sortable: true },
				{ key: 'annotation_score', label: 'Annotation Score', sortable: true, sortDirection: "desc" },
				{ key: 'actions', label: 'Actions' }
			],
			currentPage: 1,
			pageOptions: [ 5, 10, 15 ],
			filter: null,
			perPage: 20,
			totalRows: 0
		};
	},
	created() {
		this.getGenomes();
	},

	methods: {
		getGenomes() {
			this.$http
				.get("http://localhost:3001/genomes/index", {})
				.then(response => {
					console.log(response.data);
					if (response.data.length) {
						// this.genomes = response.data
						this.genomes = this.genomes.concat(response.data);
						this.totalRows = this.genomes.length
					} else {
					}
				});
		},
		onSelect(item) {
			if (this.edit_event === true) {
				return this.showEdit(item.venomkb_id)	
			}
			if (this.delete_event === true) {
				return this.showDelete(item.venomkb_id)
			}
			return this.show(item.venomkb_id)
		},
		add() {
		this.$router.push({
			name: "AddGenome",
			params: {}
			});
		},
		show(genome_id) {
			this.$router.push({
				name: "Genome",
				params: { genome_id: genome_id }
			});
		},
		edit() {
			this.edit_event = true
		},
		delete() {
			this.delete_event = true
		},
		showAlert(genome_id){
            // Use sweetalret2
			console.log(genome_id);
			this.delete_event = true

            this.$swal({
				
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
				})
				.then((result) => {
					this.$http
						.delete("http://localhost:3001/genome/" + genome_id, {})
						.then(response => {
							this.$swal(
							'Deleted!',
							'The genome has been deleted.',
							'success'
							)
						})
						.then(() => {
							return this.showDelete(genome_id);
						})
				})
				
        },
		showEdit(genome_id) {
			this.$router.push({
				name: "EditGenome",
				params: { genome_id: genome_id }
			});
		},
		showDelete(genome_id) {
			this.$router.push({
				name: "DeleteGenome",
				params: { genome_id: genome_id }
			});
		},
		onFiltered (filteredItems) {
		// Trigger pagination to update the number of buttons/pages due to filtering
		this.totalRows = filteredItems.length
		this.currentPage = 1
		}
	}
};
</script>