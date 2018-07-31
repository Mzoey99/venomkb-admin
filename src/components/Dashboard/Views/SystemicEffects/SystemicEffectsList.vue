<template>
  <div class="content">

    <b-modal ref="myModalRef" hide-footer title="Add a Protein">
      <div class="d-block text-center">
        <h4>Add a systemic effect from form</h4>
		<b-btn class="mt-3" variant="primary" block @click="add">Add systemic effect</b-btn>
		<h3>OR</h3>
		<h4>Add a systemic effect from file</h4>
		<b-form-file v-model="file" placeholder="Choose a file..."></b-form-file>
		<div class="mt-3">Selected file: {{file && file.name}}</div>
		<b-button :disabled="file ? false : 'disabled'" variant="primary" @click="sendFile()">
			Add a systemic effect
		</b-button>
      </div>
      <b-btn class="mt-3" block @click="hideModal">Close Me</b-btn>
    </b-modal>

	  <b-container fluid>
	  <b-card>
		  <b-row>
			<b-col>
				<h4 slot="header" class="text-black">Systemic Effect</h4>
			</b-col>
			<b-col>
				<b-button class="float-right" variant="primary" @click="showModal">
					Add a systemic effect
				</b-button>
			</b-col>
		</b-row>
	<b-card-body>

		<!-- User Interface controls -->
		<b-row>
			<b-col md="6" class="my-1">
				<b-form-group horizontal label="Filter" class="mb-0">
					<b-input-group>
						<b-form-input v-model="filter" placeholder="Type to Search" />
						<b-input-group-append>
							<b-btn style="border-width:0" :disabled="!filter" @click="filter = ''">Clear</b-btn>
						</b-input-group-append>
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
						 :items="systemic_effects"
						 :fields="fields"
						 :current-page="currentPage"
						 :per-page="perPage"
						 :filter="filter"
						 @filtered="onFiltered"
						 @row-clicked="onSelect"
		>
			<template slot="venomkb_id" slot-scope="row">{{row.value}}</template>
			<template slot="name" slot-scope="row">{{row.value}}</template>
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
import EditSystemicEffect from "src/components/Dashboard/Views/SystemicEffects/EditSystemicEffect.vue";
import Card from 'src/components/UIComponents/Cards/Card.vue'


export default {
	components: {
		EditSystemicEffect,
		Card
	},
	data() {
		return {
			systemic_effects: [],
			fields: [
				{ key: 'venomkb_id', label: 'Venomkb Id' },
				{ key: 'name', label: 'Name', sortable: true },
				{ key: 'actions', label: 'Actions' }
			],
			currentPage: 1,
			pageOptions: [ 5, 10, 15, 20, 30 ],
			filter: null,
			perPage: 20,
			totalRows: 0,
			edit_event: false,
			delete_event: false,
			file: null
		};
	},
	created() {
		this.getSystemic();
	},

	methods: {
		getSystemic() {
			this.$http
				.get("http://localhost:3001/systemic-effects/index", {})
				.then(response => {
					this.systemic_effects = this.systemic_effects.concat(response.data);
					this.totalRows = this.systemic_effects.length
					
				});
		},
		showModal () {
		this.$refs.myModalRef.show()
		},
		hideModal () {
		this.$refs.myModalRef.hide()
		},
		sendFile() {
			const formData = new FormData();
			formData.append("json_file", this.file);
			this.$http
				.post("http://localhost:3001/systemic-effects/file", formData)
				.then(response => {
					console.log(response);
				}).catch(err => {
					console.log(err);
				})
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
			name: "AddSystemicEffect",
			params: {}
		});
		},
		show(systemic_id) {
			this.$router.push({
				name: "SystemicEffect",
				params: { systemic_id: systemic_id }
			});
		},
		edit() {
			this.edit_event = true
		},
		delete() {
			this.delete_event = true
		},
		showAlert(systemic_id){
            // Use sweetalret2
			console.log(systemic_id);
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
						.delete("http://localhost:3001/systemic/" + systemic_id, {})
						.then(response => {
							this.$swal(
							'Deleted!',
							'The systemic effect has been deleted.',
							'success'
							)
						})
						.then(() => {
							return this.showDelete(systemic_id);
						})
				})
				
        },
		showEdit(systemic_id) {
			this.$router.push({
				name: "EditSystemicEffect",
				params: { systemic_id: systemic_id }
			});
		},
		showDelete(systemic_id) {
			this.$router.push({
				name: "DeleteSystemicEffect",
				params: { systemic_id: systemic_id }
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

<style scoped>
.btn.disabled {
	background-color: #6c757d;
}
</style>
