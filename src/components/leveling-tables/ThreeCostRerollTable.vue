<script setup lang="ts">
defineProps({
  showDescription: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <ul class="list bg-base-200 rounded shadow-md">
    <li class="p-2 pb-2 opacity-90 tracking-wide" :class="{ hidden: showDescription }">
      Similar in a way to standard but with a strong focus on cashing out at levels 6 and 7. Good
      for 3 cost carry comps and can pivot back into standard or fast 8/9 if you are heavily
      contested or get lucky augments or units for another comp.
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">4 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>2-1</b></span
            >, <span class="text-error">2-2</span>,
            <span class="text-warning">2-3</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Do not roll</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Buy XP on 2-1 unless terrible board or lose-streaking.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">5 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">2-3</span>, <span class="text-accent"><b>2-5</b></span
            >, <span class="text-error">2-7</span>,
            <span class="text-warning">3-1</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">DO NOT ROLL</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Avoid leveling on 2-3 so you don't screw up your interest for 2-3 and 2-4 (carousel).
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">6 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">3-1</span>, <span class="text-accent"><b>3-2</b></span
            >, <span class="text-error">3-5</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Stabilize and get ready for level 7</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Ideally you don't want to roll on 6 unless you're losing a lot, but since you will be most
          of the time you can roll to hit 2* 3 cost units that you need. Sometimes you might need to
          roll down to 0 in desperate situations and it's fine since the odds of 3 cost aren't too
          terrible.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">7 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">3-5</span>, <span class="text-accent"><b>4-1</b></span
            >, <span class="text-error">4-2</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">50g+ after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Stabilize by spending money to get several 2* of your main units and then econ to 50+g and
          slow roll. if you are close to hitting a 3* (6 or 7 copies) you can roll down to 0. When
          you hit your desired units or if you are having awful luck you can move to level 8 and try
          to get a 4 cost 2*.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">8 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>5-x</b></span
            >, <span class="text-accent"><b>6-x</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Round out your comp</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Finish any traits you might have hanging or go for 4 cost 2* on your tanks or sub-carries.
          Usually you won't go for level 9 so if you start losing here think on an exsit strategy
          depending on health and board strength.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">9 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg"><span class="text-warning">6-x</span>,</p>
        </div>
        <div class="uppercase font-semibold text-lg">Luxury upgrade</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Usually won't happen.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">10</div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">Stage 6+</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Luxury upgrade</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Unless going for a prismatic augment or something specific, avoid and stabilize at 8 or 7.
        </p>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.font-semibold {
  font-weight: 400;
}

.text-accent {
  color: #008a0e;
  font-weight: 500;
}
.text-error {
  color: #e05858;
}
.text-warning {
  color: #ffb94f;
}
.opacity-70 {
  opacity: 90%;
}
</style>
