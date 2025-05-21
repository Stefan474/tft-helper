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
      Good for 4* comps since you will spend most of your gold at level 8 (leveling table). Can
      pivot from
      <b class="text-accent opacity-100">Standard</b> and into
      <b class="text-accent opacity-100">fast 9</b>. Try to maintain good economy but don't be
      afraid to spend if you have to on level 7 if you're going to die. Early econ augments
      recommended.
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
          Buy XP on 2-1 unless terrible board or lose-streaking
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
        <div class="uppercase font-semibold text-lg">DO NOT ROLL</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Only roll max 10g if you have a 2*pair for stabilization. Mostly not recommended.
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
        <div class="uppercase font-semibold text-lg">30g+ after leveling up, DO NOT ROLL</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Only roll if you are going to lose or you depserately need a trait breakpoint like Anmima
          5 to keep up tempo or survive.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">8 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>4-2</b></span
            >, <span class="text-accent"><b>4-5</b></span
            >, <span class="text-warning">5-1</span>,
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">30g+ after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Roll all your gold to hit your end-board. If you are stable and have 80+ health consider
          going 9 if your comp gets better at 9, if not still roll all to upgrade your board.
          <b
            >You don't have to be on 30+ when you hit 9, so push for 9 when you don't have any
            good/gamechanging upgrades to be gained from rolling more 4 star units.</b
          >
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">9 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">5-1</span>, <span class="text-warning">5-2</span>,
            <span class="text-warning">5-5</span>, <span class="text-accent"><b>6-1</b></span
            >, <span class="text-accent"><b>6-2</b></span
            >, <span class="text-warning">6-5</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Spend everything</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Roll everything to get your level 2 5 star units unless you are going for a prismatic
          trait or something specific that needs level 10.
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
          Only go for this if you can't realistically get 3* upgrades on level 9 or if you are going
          for a specific trait breakpoint. Not recommended before you have at least all needed level
          2 5 star units or you know exactly what you're doing.
        </p>
      </div>
    </li>
  </ul>
</template>
