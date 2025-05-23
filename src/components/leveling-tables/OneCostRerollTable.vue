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
      The idea of this pattern is usually to lose stream early for economy (specially if you get a
      lose-streak augment) and to spend as much time as you can on lower levels until you hit your
      needed units. Once you get your units to level 3 you can focus on leveling up and adding
      additional pieces for trait synergies or pivoting into a
      <span class="text-accent">2 or 3 cost reroll</span> pattern to finish your comp. Good for 1
      cost units obviously.
      <span class="text-accent"
        >If you can, get a reroll augment or a shop augment to reach level 3 faster.</span
      >
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">4 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>2-3</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Do not buy EXP</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          At <span class="text-accent"><b>3-1</b></span> while you are still level 4 roll down to 32
          gold (don't go under). <br />
          If you are at 7+ copies of your desired 1 cost unit, roll another 10. <br />
          If after that you are at 8 copies roll 10 more or even roll all your gold if you already
          have items complete.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">5 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>3-2</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">think when to all-in</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          If you are at 32 gold, you will be on 50 in 2 rounds, which is when you start slow rolling
          (rolling down to 50g every round).<br />
          If you are sitting on 4+ copies of your needed unit, consider fishing (rolling 10g at a
          time to see if you hit the unit you need). <br />
          Once you are at 6+ of your most important unit you can think about all-inning (rolling
          till 0).
          <span class="text-accent">At stage 4-1 roll everything no matter the situation.</span>
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">6 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">3-x</span>, <span class="text-accent"><b>4-x</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">focus on XP and rounding out the comp</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Generally after you hit all your crucial 3* units you will want to focus on levels to add
          additional traits for your comp.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">7 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">4-x</span>, <span class="text-accent"><b>5-x</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">focus on XP and rounding out the comp</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Go for 7 and roll if 2* your cost will help stabilize or focus on EXP if you want 4* to
          round out your comp. Roll down if you're in danger of losing to stall.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">8 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">5-x</span>, <span class="text-accent"><b>6-x</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Round out your comp</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          At this point you are probably out of tempo and need to roll everything unless you are
          really healthy and are going for level 9 to get a 2* 5 cost unit as a secondary/tertiary
          carry.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">9 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">6-x</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Usually suboptimal</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Unless you really highrolled or are so ahead in economy, it's probably not good to go for
          this. However if your board was stable and you had the tempo to do it, go for 2* 5 cost
          units at this stage.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">10</div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-error">Stage 7+</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">xd</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          This will not happen.
        </p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.text-accent {
  color: #008a0e;
}
.text-error {
  color: #c01111;
  font-weight: 400;
}
.text-warning {
  color: #ff6a00;
  font-weight: 400;
}
.opacity-70 {
  opacity: 90%;
}
.list-col-wrap,
.opacity-90 {
  font-size: medium;
}

b {
  font-weight: 700;
}
.font-semibold {
  font-weight: 400;
}
</style>
