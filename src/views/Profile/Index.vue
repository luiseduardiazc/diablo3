<template>
    <div>
        <BaseLoading v-if="isLoading"/>
        <h1>Profile Index</h1>
    </div>
</template>

<script>

// Import mixin error to handle api response error
import setError from '@/mixins/setError'
import { getApiAccount } from '@/api/search'
import BaseLoading from '@/components/BaseLoading'

export default {
  name: 'ProfileView',
  mixins: [
    setError
  ],
  components: { BaseLoading },
  data () {
    return {
      isLoading: false,
      profileData: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const { region, battleTag: account } = this.$route.params
      getApiAccount({ region, account })
        .then(({ data }) => {
          this.profileData = data
          console.log(this.profileData)
        })
        .catch((err) => {
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
