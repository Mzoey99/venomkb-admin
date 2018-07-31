import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'

import ProteinsList from 'src/components/Dashboard/Views/Proteins/ProteinsList.vue'
import ProteinForm from 'src/components/Dashboard/Views/Proteins/ProteinForm.vue'
import ProteinLayout from "src/components/Dashboard/Views/Proteins/ProteinLayout.vue"
import EditProteinForm from "src/components/Dashboard/Views/Proteins/EditProteinForm.vue"
import AddProteinForm from "src/components/Dashboard/Views/Proteins/AddProteinForm.vue"

import GenomesList from 'src/components/Dashboard/Views/Genomes/GenomeList.vue'
import GenomeForm from 'src/components/Dashboard/Views/Genomes/GenomeForm.vue'
import GenomeLayout from "src/components/Dashboard/Views/Genomes/GenomeLayout.vue"
import EditGenomeForm from "src/components/Dashboard/Views/Genomes/EditGenomeForm.vue"
import AddGenomeForm from "src/components/Dashboard/Views/Genomes/AddGenomeForm.vue"

import SystemicEffectsList from 'src/components/Dashboard/Views/SystemicEffects/SystemicEffectsList.vue'
import SystemicEffectForm from 'src/components/Dashboard/Views/SystemicEffects/SystemicEffectForm.vue'
import SystemicEffectLayout from "src/components/Dashboard/Views/SystemicEffects/SystemicEffectLayout.vue"
import EditSystemicEffect from "src/components/Dashboard/Views/SystemicEffects/EditSystemicEffect.vue"
import AddSystemicEffect from "src/components/Dashboard/Views/SystemicEffects/AddSystemicEffect.vue"


import SpeciesList from 'src/components/Dashboard/Views/Species/SpeciesList.vue'
import SpeciesForm from 'src/components/Dashboard/Views/Species/SpeciesForm.vue'
import SpeciesLayout from "src/components/Dashboard/Views/Species/SpeciesLayout.vue"
import EditSpeciesForm from "src/components/Dashboard/Views/Species/EditSpeciesForm.vue"
import AddSpeciesForm from "src/components/Dashboard/Views/Species/AddSpeciesForm.vue"

import Semantic from "src/components/Dashboard/Views/Semantic.vue"


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'proteins',
        name: 'Proteins',
        component: ProteinLayout,
        redirect: '/proteins/proteinsList',
        children: [
          {
            path: 'proteinsList',
            name: 'Proteins',
            component: ProteinsList,
          },
          {
            path: 'protein/:protein_id',
            name: 'Protein',
            component: ProteinForm,
            props: true
          },
          {
            path: 'editProtein/:protein_id',
            name: 'EditProtein',
            component: EditProteinForm,
            props: true
          },
          {
            path: 'deleteProtein/:protein_id',
            name: 'DeleteProtein',
            component:ProteinsList,
            props: true
          },
          {
            path: 'addProtein',
            name: 'AddProtein',
            component: AddProteinForm,
            props: true
          }
        ]
      },
      {
        path: 'systemic-effects',
        name: 'SystemicEffects',
        component: SystemicEffectLayout,
        redirect: '/systemic-effects/systemic-effectsList',
        children: [
          {
            path: 'systemic-effectsList',
            name: 'SystemicEffects',
            component: SystemicEffectsList,
          },
          {
            path: 'systemic-effect/:protein_id',
            name: 'SystemicEffect',
            component: SystemicEffectForm,
            props: true
          },
          {
            path: 'editSystemicEffect/:protein_id',
            name: 'EditSystemicEffect',
            component: EditSystemicEffect,
            props: true
          },
          {
            path: 'deleteSystemicEffect/:protein_id',
            name: 'DeleteSystemicEffect',
            component: EditSystemicEffect,
            props: true
          },
          {
            path: 'addSystemicEffect',
            name: 'AddSystemicEffect',
            component: AddSystemicEffect,
            props: true
          }
        ]
      },
      {
        path: 'species',
        name: 'Species',
        component: SpeciesLayout,
        redirect: '/species/speciesList',
        children: [
          {
            path: 'speciesList',
            name: 'Species',
            component: SpeciesList,
          },
          {
            path: 'species/:species_id',
            name: 'Specie',
            component: SpeciesForm,
            props: true
          },
          {
            path: 'editSpecies/:species_id',
            name: 'EditSpecies',
            component: EditSpeciesForm,
            props: true
          },
          {
            path: 'deleteSpecies/:species_id',
            name: 'DeleteSpecies',
            component: SpeciesList,
            props: true
          },
          {
            path: 'addSpecies',
            name: 'AddSpecies',
            component: AddSpeciesForm,
            props: true
          }
        ]
      },
      {
        path: 'genomes',
        name: 'Genomes',
        component: GenomeLayout,
        redirect: '/genomes/genomesList',
        children : [
          {
              path: 'genomesList',
              name: 'Genomes',
              component: GenomesList,
            },
            {
              path: 'genome/:genome_id',
              name: 'Genome',
              component: GenomeForm,
              props: true
            },
            {
              path: 'editGenome/:genome_id',
              name: 'EditGenome',
              component: EditGenomeForm,
              props: true
            },
            {
              path: 'deleteGenome/:genome_id',
              name: 'DeleteGenome',
              component: GenomesList,
              props: true
            },
            {
              path: 'addGenome',
              name: 'AddGenome',
              component: AddGenomeForm,
              props: true
            }
        ]
      },
      {
        path: 'semantic',
        name: 'Semantic',
        component: Semantic
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
