<template>
  <b-card
    :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
          <p class="list-item-heading mb-0 truncate">{{ data.name }}</p>
        </router-link>
        <div class="w-15 w-sm-100">

          <b-button @click="likeSport(data.id, data.name,false)" v-if="data.isLiked === true" class="bg-warning">Unlike</b-button>
          <b-button @click="likeSport(data.id, data.name)" v-else class="bg-success">Like</b-button>
          <router-link
            :to="{
     path: '/app/dashboards/sportdetail/'+ data.id,
   }">
            <b-button>View</b-button>
          </router-link>
        </div>

      </div>
    </div>
  </b-card>
</template>

<script>
import axios from "axios";
import { getCurrentUser } from "@/utils";

export default {
  props: ["data", "selectedItems"],
  methods: {
    likeSport(sportId, sportsName, isLiked = true) {
      axios
        .post("http://localhost:3000/v1/sports/like", {
          sportsId: sportId,
          isLike: true,
          sportsName,
        }, {
          headers: {
            "authorization": getCurrentUser().tokens.refresh.token
          }
        })
        .then(response => {
          return response;
        }).then(res => {
        this.data.isLiked = isLiked;
      });
    }
  }
};
</script>
