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
    <li class="p-2 pb-2 opacity-90 tracking-wide" :class="{ hidden: showDescription }">
      The idea of this pattern is to lose streak early to get some economy, although you can also
      level up on <span class="text-accent"><b>2-1</b></span> and play a strong board. Look to hit
      interest breakpoints early if you can or just maintain a strong board.
      <span class="text-accent"> reroll augments or starry night are top tier for this comp.</span>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">4 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">2-1</span>,
            <span class="text-accent"><b>2-3</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">Do not roll</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Chillin. Think when to go for level 5 based on your traits and interest fron your
          augment/portal.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">5 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-warning">2-5</span>, <span class="text-accent"><b>3-1</b></span
            >, <span class="text-error">3-2</span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">do not roll</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          Avoid rolling and build economy for level 6 when you'll get to all in. Think either 3-2 or
          3-5 based on how much gold you have and the strength of your board.
        </p>
      </div>
    </li>

    <li class="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums my-auto">6 </div>

      <div class="list-col-grow">
        <div>
          <p class="text-lg">
            <span class="text-accent"><b>3-2</b></span
            >, <span class="text-accent"><b>3-5</b></span>
          </p>
        </div>
        <div class="uppercase font-semibold text-lg">50+g after leveling up</div>
        <p class="list-col-wrap mt-0.5 opacity-70" :class="{ hidden: showDescription }">
          This is where you make or break your game, you are looking to hit your 3* carry asap to
          get tempo.
          <br />
          If you have <b class="text-accent">4+ copies</b> of your carry unit, consider fishing
          (rolling 10g at a time to see if you hit the unit you need). <br />
          Once you are at <b class="text-accent">6+ copies</b> of your most important unit you can
          think about all-inning (rolling to 0) to stabilize asap (unless you're in a PVE round in
          which case you delay to get max interest and then roll to 0).
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
          Typically after you get your crucial 3*s, you spend all your money on leveling for most of
          the game to add in additional traits unless it's a hybrid 2/3 star carry comp like set 13
          ambushers or set 14 executioners (if graves didn't suck).
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
