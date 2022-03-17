<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        title="User Liked Sports"
      ></list-page-heading>
      <template v-if="isLoad">
        <list-page-listing
          :items="items"
          :selectedItems="selectedItems"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import ListPageHeading from "../../../../containers/pages/ListPageHeading";
import ListPageListingLiked from "../../../../containers/pages/ListPageListingLiked";
import { getCurrentUser } from "@/utils";

export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListingLiked
  },
  data() {
    return {
      isLoad: false,
      apiBase: "http://localhost:3000/v1/sports/liked/sports",
      displayMode: "list",
      sort: {
        column: "title",
        label: "Sports Name"
      },
      items: [],
      selectedItems: []
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;

      axios
        .get(this.apiUrl, {
          headers: {
            "authorization": getCurrentUser().tokens.refresh.token
          }
        })
        .then(response => {
          return response.data;
        })
        .then(res => {

          this.items = res.response.map(x => {
            return {
              ...x
            };
          });
          this.isLoad = true;
        }).catch((err) => {
        this.$notify("error", "Error", err.message, {
          duration: 3000,
          permanent: false
        });
        this.$router.push("/user/login");
      });
    }
  },
  computed: {
    apiUrl() {
      return `${this.apiBase}?sort=${this.sort.column}&page=${this.page}&per_page=${this.perPage}&search=${this.search}`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    this.loadItems();
  }
};
</script>
