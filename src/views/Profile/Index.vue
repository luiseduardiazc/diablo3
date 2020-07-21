<template>
  <div>
    <h1>{{name}}</h1>
    <BaseLoading v-if="isLoading" />
    <h1>Profile Index</h1>
    <template v-if="profileData !== null">
      <MainBlock :profileData="profileData" />
      <ArtisansBlock :artisans-data="artisansData" />
    </template>
  </div>
</template>

<script>
// Import mixin error to handle api response error
import setError from '@/mixins/setError'
import { getApiAccount } from '@/api/search'
import BaseLoading from '@/components/BaseLoading'
import MainBlock from './MainBlock/Index'
import ArtisansBlock from './ArtisansBlock/Index'

export default {
  name: 'ProfileView',
  mixins: [setError],
  components: {
    BaseLoading,
    MainBlock,
    ArtisansBlock
  },
  data () {
    return {
      isLoading: false,
      profileData: null
    }
  },
  created () {
    console.log(this.name)
    if (this.name === '') {
      this.fetchData()
    }
  },
  computed: {
    artisansData () {
      return {
        blacksmith: this.profileData.blacksmith,
        blacksmithHardcore: this.profileData.blacksmithHardcore,
        jeweler: this.profileData.jeweler,
        jewelerHardcore: this.profileData.jewelerHardcore,
        mystic: this.profileData.mystic,
        mysticHardcore: this.profileData.mysticHardcore
      }
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    fetchData () {
      const { region, battleTag: account } = this.$route.params
      getApiAccount({ region, account })
        .then(({ data }) => {
          this.profileData = data
          console.log(this.profileData)
        })
        .catch(err => {
          this.profileData = null
          const errObj = {
            routeParams: this.$route.params,
            message: err.message
          }
          if (err.response) {
            errObj.data = err.response.data
            errObj.status = err.response.status
          }
          // using error mixin
          this.setApiErr(errObj)
          // go to 'Error' route
          this.$router.push({ name: 'Error' })
        })
    }
  }
}
</script>
