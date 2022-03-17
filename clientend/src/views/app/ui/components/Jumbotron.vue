<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-jumbotron :header="sport.name" header-level="4">
            <h3>Filters</h3>
            <table>
              <tr>
                <th>Name</th>
              </tr>
              <tr v-for="filters in sport.filters">
                <td>{{ filters }}</td>
              </tr>

            </table>
          </b-jumbotron>

          <b-jumbotron header="Sport Places" header-level="4">
            <div class="form-group">
              <vue-auto-complete id="map" class="form-control"
                                 placeholder="Start typing. By default it fetch by your browser location."
                                 v-on:placechanged="getAddressData">
              </vue-auto-complete>
            </div>
            <table>
              <tr>
                <th>Name</th>
              </tr>
              <tr v-for="place in sportPlaces.data.features">
                <td>{{ place.properties.name }}</td>
              </tr>

            </table>
          </b-jumbotron>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

import axios from "axios";

export default {
  components: {
    "vue-auto-complete": VueGoogleAutocomplete
  },
  data() {
    return {
      sportId: null,
      sport: null,
      sportPlaces: null,
      latitude: null,
      longitude: null,
      addressdata: null
    };
  },
  async created() {
    await this.getBrowserLocation();
  },
  async mounted() {
    await this.getBrowserLocation();
    this.sportId = this.$route.params.id;
    await this.pullSportsDetail();
  },
  watch: {
    addressdata(val) {
      this.latitude = val.latitude;
      this.longitude = val.longitude;
      this.pullSportPlaces();
    }
  },
  methods: {
    getAddressData: function(addressData, placeResultData, id) {
      this.addressdata = addressData;
    },
    async pullSportsDetail() {
      axios
        .get("https://sportplaces.api.decathlon.com/api/v1/sports/" + this.sportId, {})
        .then(response => {
          return response.data;
        })
        .then(res => {
          this.sport = res;
        });

    },
    pullSportPlaces() {
      axios
        .get("https://sportplaces.api.decathlon.com/api/v1/places?origin=" + this.longitude + "," + this.latitude + "&radius=999&sports=" + this.sportId, {})
        .then(response => {
          return response.data;
        })
        .then(res => {
          this.sportPlaces = res;
        });

    },
    async getBrowserLocation() {

      const success = (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.pullSportPlaces();
      };


      const error = (err) => {
        console.log(error);
      };

      // This will open permission popup
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
};
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.pac-container {
  top: 562px !important;
}
</style>
