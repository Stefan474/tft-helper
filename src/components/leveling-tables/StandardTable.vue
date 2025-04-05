<script setup lang="ts">
defineProps({
  showDescription: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <ul class="list bg-base-100 rounded shadow-md">
    <li class="p-2 pb-2 text-xs opacity-90 tracking-wide">
      Good in most situations. Go for this if you don't know what to play. Can pivot into
      <b class="text-accent opacity-100">2 and 3 cost reroll</b> and
      <b class="text-accent opacity-100">fast 8/9</b>. Good if you need multiple carries.
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">4 </div>

      <div class="list-col-grow">
        <div>
          <p>
            <span class="text-accent"><b>2-1</b></span
            >, <span class="text-error">2-2</span>,
            <span class="text-warning">2-3</span>
          </p>
        </div>
        <div class="text-xs uppercase font-semibold">Do not roll</div>
        <p class="list-col-wrap text-xs mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Buy XP on 2-1 unless terrible board or lose-streaking
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">5 </div>

      <div class="list-col-grow">
        <div>
          <p>
            <span class="text-error">2-3</span>, <span class="text-accent"><b>2-5</b></span
            >, <span class="text-error">2-7</span>,
            <span class="text-warning">3-1</span>
          </p>
        </div>
        <div class="text-xs uppercase font-semibold">DO NOT ROLL</div>
        <p class="list-col-wrap text-xs mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Avoid leveling on 2-3 so you don't screw up your interest for 2-3 and 2-4 (carousel).
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">6 </div>

      <div class="list-col-grow">
        <div>
          <p>
            <span class="text-error">3-1</span>, <span class="text-accent"><b>3-2</b></span
            >, <span class="text-error">3-5</span>
          </p>
        </div>
        <div class="text-xs uppercase font-semibold">stay on 20-30g+ after leveling up</div>
        <p class="list-col-wrap text-xs mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Do not roll on 6 unless you have a lot of pairs or are low on health and have some pairs.
          Don't spend more than 10-30g on rerolling unless you are low hp.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">7 </div>

      <div class="list-col-grow">
        <div>
          <p>
            <span class="text-warning">3-5</span>, <span class="text-accent"><b>4-1</b></span
            >, <span class="text-error">4-2</span>
          </p>
        </div>
        <div class="text-xs uppercase font-semibold">30g+ after leveling up</div>
        <p class="list-col-wrap text-xs mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          You can level earlier in sets with strong economy (like set 14). Roll a bit if you need to
          stabilize your board and need specific 3-stars. If you are healthy roll maybe 10g max, if
          in risk of losing try to stabilize.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">8 </div>

      <div class="list-col-grow">
        <div>
          <p>
            <span class="text-warning">3-5</span>, <span class="text-accent"><b>4-1</b></span
            >, <span class="text-error">4-2</span>
          </p>
        </div>
        <div class="text-xs uppercase font-semibold">30g+ after leveling up</div>
        <p class="list-col-wrap text-xs mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          You can level earlier in sets with strong economy (like set 14). Roll a bit if you need to
          stabilize your board and need specific 3-stars. If you are healthy roll maybe 10g max, if
          in risk of losing try to stabilize.
        </p>
      </div>
    </li>
  </ul>
</template>
