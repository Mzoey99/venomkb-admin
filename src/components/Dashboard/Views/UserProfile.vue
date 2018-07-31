<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <edit-protein-form>
          </edit-protein-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditProteinForm from "src/components/Dashboard/Views/Proteins/EditProteinForm.vue";

export default {
	components: {
		EditProteinForm,
		UserCard
	},
	data() {
		return {
			proteins: []
		};
	},
	created() {
		this.getProteins();
	},

	methods: {
		getProteins() {
			axios
				.get(`http://localhost:3001/proteins/limit?limit=` + 0, {})
				.then(response => {
					console.log(response.data);
					if (response.data.length) {
						// this.proteins = response.data
						this.proteins = this.proteins.concat(response.data);
					} else {
					}
				});
		},
		onSelect(item) {
			this.$router.push({
				name: "Protein",
				params: { protein_id: item.venomkb_id }
			});
		}
	}
};
</script>

<style>

</style>
