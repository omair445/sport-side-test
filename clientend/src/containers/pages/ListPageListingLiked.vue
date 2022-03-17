<template>
  <div>
    <b-row key="list">
      <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
        <data-list-item
          :key="item.id"
          :data="item"
          :selected-items="selectedItems"
        />
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import DataListItemLiked from "../../components/Listing/DataListItemLiked";

export default {
  components: {
    "data-list-item": DataListItemLiked
  },
  props: [
    "items",
    "selectedItems"
  ],
  methods: {}
};
</script>
