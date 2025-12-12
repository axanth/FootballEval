<script lang="ts">
    import StarRating from "./StarRating.svelte";
    export let categoryKey: string;
    export let categoryLabel: string;
    export let metrics: Array<{ id: string; label: string }>;
    export let ratings: Record<string, number>;
    export let onRatingChange: (metricId: string, value: number) => void;

    // Reactive calculation that updates when ratings change
    $: categoryAverage = (() => {
        const ratedMetrics = metrics.filter((m) => ratings[m.id] > 0);
        if (ratedMetrics.length === 0) return 0;
        const sum = ratedMetrics.reduce(
            (acc, m) => acc + (ratings[m.id] || 0),
            0,
        );
        return Math.round((sum / ratedMetrics.length) * 10) / 10;
    })();
</script>

<div class="card">
    <!-- Card Header -->
    <header class="card-header has-background-light">
        <p class="card-header-title is-centered">
            {@html categoryLabel}
        </p>
    </header>

    <!-- Card Content - Metrics -->
    <div class="card-content" data-key={categoryKey}>
        <div class="content">
            {#each metrics as metric}
                <div class="mb-4">
                    <p class="has-text-centered has-text-weight-medium mb-3">
                        {metric.label}
                    </p>
                    <div class="is-flex is-justify-content-center">
                        <StarRating
                            rating={ratings[metric.id] || 0}
                            maxRating={5}
                            onChange={(value) =>
                                onRatingChange(metric.id, value)}
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Card Footer - Average Score -->
    <footer class="card-footer has-background-light">
        <div class="card-footer-item is-justify-content-flex-end">
            <span class="tag is-info is-medium is-rounded">
                Avg: {categoryAverage.toFixed(1)}/5.0
            </span>
        </div>
    </footer>
</div>
