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
      Similar to fast 8 and great for comps focusing on 5 cost units. Recommended to have at least
      one econ augment or even two if the portal doesn't help leveling up faster. If set mechanics
      favor fast 9 (like set 14), you can go for it without issues even with 1 econ augment.
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
          Buy XP on 2-1 unless terrible board or lose-streaking. Considering you want to be healthy
          you most likely want to level up ASAP and play with a strong early board.
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
        <div class="uppercase font-semibold text-lg">30g+ after leveing up, DO NOT ROLL</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Try not to roll unless you have to stabilize.
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
          Only roll if you are going to lose. If you feel you will lose fast, consider if you can
          pivot into a fast 8 comp or stabilizing at 8 (getting key 4 cost units to 2 star) and then
          going for 9. Try not to go under 30 gold if possible.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">9 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">4-2</span>, <span class="text-warning">4-5</span>,
            <span class="text-accent"><b>5-1</b></span
            >, <span class="text-accent"><b>5-2</b></span
            >, <span class="text-warning">5-5</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Establish end game board</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Roll everything to get your 5 cost level 2 units unless you are going for a prismatic
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
