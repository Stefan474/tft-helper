<script setup lang="ts">
import { ref } from 'vue'

const tabTracker = ref(1)
</script>

<template>
  <div class="flex justify-center pt-5 min-h-screen px-4">
    <div class="tabs tabs-lift w-full max-w-4xl">
      <!-- Tab 1 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 1"
        :checked="tabTracker === 1"
        @change="tabTracker = 1"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step" @click="tabTracker = 2">Step 2</li>
            <li class="step" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 1</div>
      </div>

      <!-- Tab 2 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 2"
        :checked="tabTracker === 2"
        @change="tabTracker = 2"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 2</div>
      </div>

      <!-- Tab 3 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 3"
        :checked="tabTracker === 3"
        @change="tabTracker = 3"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 3</div>
      </div>

      <!-- Tab 4 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 4"
        :checked="tabTracker === 4"
        @change="tabTracker = 4"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step step-primary" @click="tabTracker = 4">Step 4</li>
            <li class="step" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 4</div>
      </div>

      <!-- Tab 5 -->
      <input
        type="radio"
        name="my_tabs_3"
        class="tab hidden"
        aria-label="Tab 5"
        :checked="tabTracker === 5"
        @change="tabTracker = 5"
      />
      <div class="tab-content bg-base-100 border-base-300 p-4 sm:p-6 md:p-8">
        <div class="flex justify-center">
          <ul class="steps flex-wrap justify-center">
            <li class="step step-primary" @click="tabTracker = 1">Step 1</li>
            <li class="step step-primary" @click="tabTracker = 2">Step 2</li>
            <li class="step step-primary" @click="tabTracker = 3">Step 3</li>
            <li class="step step-primary" @click="tabTracker = 4">Step 4</li>
            <li class="step step-primary" @click="tabTracker = 5">Step 5</li>
          </ul>
        </div>
        <div class="mt-5 text-center">Content for Tab 5</div>
      </div>
    </div>
  </div>
</template>
