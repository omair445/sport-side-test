<template>
  <b-card
    :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
          <p class="list-item-heading mb-0 truncate">{{ data.sportsName }}</p>
        </router-link>
        <div class="w-15 w-sm-100">
          <b-button class="bg-success">Update</b-button>
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
    onUpdate(){

    }
  }
};
</script>
