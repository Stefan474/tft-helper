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
      Good in most situations. Go for this if you don't know what to play. Can pivot into
      <b class="text-accent opacity-100">2 and 3 cost reroll</b> and
      <b class="text-accent opacity-100">fast 8/9</b>. Good if you need multiple carries.
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
        <div class="uppercase font-semibold text-lg">stay on 20-30g+ after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Do not roll on 6 unless you have a lot of pairs or are low on health and have some pairs.
          Don't spend more than 10-30g on rerolling unless you are low hp.
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
        <div class="uppercase font-semibold text-lg">30g+ after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          You can level earlier in sets with strong economy (like set 14). Roll a bit if you need to
          stabilize your board and need specific 3-stars. If you are healthy roll maybe 10g max, if
          in risk of losing try to stabilize.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">8 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">4-2</span>, <span class="text-accent"><b>4-5</b></span
            >, <span class="text-accent"><b>5-1</b></span
            >, <span class="text-warning">5-2</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">30g+ after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Roll a lot of your gold here. Usually 30-50g+. If you are high health or were lucky to
          have core 4* units on level 2, you can save to transition to level 9 for 5* rolls quicker.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">9 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">5-1</span>, <span class="text-warning">5-2</span>,
            <span class="text-accent"><b>5-5</b></span
            >, <span class="text-accent"><b>6-1</b></span
            >, <span class="text-warning">6-5</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Go for end-game board</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Roll most gold and stabilize here unless you have a reason to go to level 10 like going
          for a prismatic trait (10 unit vertical) or a different exodia comp in specific metas.
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
          for a specific trait breakpoint.
        </p>
      </div>
    </li>
  </ul>
</template>
