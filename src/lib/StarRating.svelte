<script lang="ts">
  export let rating: number = 0;
  export let maxRating: number = 5;
  export let onChange: (value: number) => void = () => {};

  let uniqueId = `rating-${Math.random().toString(36).substr(2, 9)}`;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newRating = parseInt(target.value);
    rating = newRating;
    onChange(newRating);
  }
</script>

<div
  class="rating-stars is-flex is-flex-direction-row-reverse is-justify-content-flex-start is-align-items-center"
>
  {#each Array(maxRating)
    .fill(0)
    .map((_, i) => maxRating - i) as starValue}
    <input
      type="radio"
      name={uniqueId}
      id="{uniqueId}-{starValue}"
      value={starValue}
      checked={rating === starValue}
      on:change={handleChange}
      class="is-sr-only"
    />
    <label for="{uniqueId}-{starValue}" class="star-label"> ★ </label>
  {/each}

  <!-- Reset option (hidden but allows deselection) -->
  <input
    type="radio"
    name={uniqueId}
    id="{uniqueId}-0"
    value="0"
    checked={rating === 0}
    on:change={handleChange}
    class="is-sr-only"
  />
</div>

<style>
  .rating-stars {
    direction: ltr;
    gap: 0.5rem;
    font-size: 2.5rem;
  }

  .star-label {
    color: #b5b5b5;
    cursor: pointer;
    transition: color 0.2s;
  }

  /* When a radio is checked, color that star and all following stars (to the right in reversed flex) */
  input[type="radio"]:checked ~ .star-label {
    color: #d4af37;
    text-shadow:
      0 0 8px #d4af37,
      0 0 10px #ffd700;
  }

  /* Hover effect: when hovering a label, color it and all following labels */
  .star-label:hover,
  .star-label:hover ~ .star-label {
    color: #d4af37;
    text-shadow:
      0 0 8px #d4af37,
      0 0 10px #ffd700;
  }

  /* Screen reader only class */
  .is-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
