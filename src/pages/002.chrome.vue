<template>

  <div class="full-height row wrap justify-start items-start content-start">
    <canvas id="indexCanvas"> </canvas>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated, inject, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useQuery } from "@tanstack/vue-query";

import * as ActShd from '../110.shade/00.shade.unit/shade.action'
import * as ActVsg from '../110.shade/01.visage.unit/visage.action'
import * as ActCan from '../110.shade/03.container.unit/container.action'


import {mount, update, unmount } from "../display/chrome"
//import {mount, update, unmount } from "../composables/tiny-screen"

const router = useRouter()
const route = useRoute()

const instance = getCurrentInstance();
const SHADE = inject('SHADE')

var  getGrid = async ()=>{

  var token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzIzMTM2MjczLCJleHAiOjE3MjU3MjgyNzMsInUiOjQzNTY1NiwiZyI6MjMxNTMsImNhcCI6InBhOnRzOnBzOmJmOm1hOnR5OmVvOnpvOnNiIn0.4apYIlJmdi60_RC3otrFCTqIobV2c9UpVA_R3Tju5Lc';

  const response = await fetch(
    `https://app.regrid.com/api/v2/usage?token=${token}`
  );
  
  
  
  const data = await response.json();

  debugger

  // fake delay
  //await new Promise((resolve) => {
  //  setTimeout(() => resolve(true), 1000);
  //});
  return data?.results || [];


}

const { isPending, isFetching, isError, data, error } = useQuery({
  
  queryFn: getGrid,
})

onMounted(async () => {


  console.log("chrome...")

  mount('on')

  //alert(window.electron.store.get('foo'));
})

onUpdated(async () => {
  // text content should be the same as current `count.value`

  update('on')


})

onUnmounted(async () => {

  //unmount('on')


})


</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheGrid'
})
</script>
