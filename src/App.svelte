<script lang="ts">
  import MetricCategoryCard from "./lib/MetricCategoryCard.svelte";

  interface Metric {
    id: string;
    key: string;
    label: string;
    category: string;
  }

  const categories = {
    Technical: "TECHNICAL (Τεχνικά στοιχεία)",
    Tactical: "TACTICAL (Τακτικά στοιχεία)",
    Physical: "PHYSICAL (Φυσικά χαρακτηριστικά)",
    Mental: "MENTAL (Ψυχολογικά / Νοητικά στοιχεία)",
    Social: "SOCIAL (Συμπεριφορά / Κοινωνική διάσταση)",
  };

  const metrics: Metric[] = [
    // TECHNICAL
    {
      id: "10000000-0000-0000-0000-000000000001",
      key: "FirstControl",
      label: "Πρώτο κοντρόλ",
      category: "Technical",
    },
    {
      id: "10000000-0000-0000-0000-000000000002",
      key: "Passing",
      label: "Passing (κοντινό/μεσαίο/μακρινό)",
      category: "Technical",
    },
    {
      id: "10000000-0000-0000-0000-000000000003",
      key: "Finishing",
      label: "Τελειώματα φάσεων",
      category: "Technical",
    },
    {
      id: "10000000-0000-0000-0000-000000000004",
      key: "Dribbling",
      label: "Dribbling / 1v1",
      category: "Technical",
    },
    {
      id: "10000000-0000-0000-0000-000000000005",
      key: "BallHandlingUnderPressure",
      label: "Χειρισμός μπάλας υπό πίεση",
      category: "Technical",
    },

    // TACTICAL
    {
      id: "20000000-0000-0000-0000-000000000001",
      key: "BodyPositioning",
      label: "Θέσεις σώματος / αντίληψη χώρου",
      category: "Tactical",
    },
    {
      id: "20000000-0000-0000-0000-000000000002",
      key: "DecisionMaking",
      label: "Λήψη αποφάσεων",
      category: "Tactical",
    },
    {
      id: "20000000-0000-0000-0000-000000000003",
      key: "Transitions",
      label: "Μεταβάσεις (άμυνα-επίθεση)",
      category: "Tactical",
    },
    {
      id: "20000000-0000-0000-0000-000000000004",
      key: "TacticalDiscipline",
      label: "Πειθαρχία στο τακτικό πλάνο",
      category: "Tactical",
    },
    {
      id: "20000000-0000-0000-0000-000000000005",
      key: "LineCooperation",
      label: "Συνεργασία με γραμμές",
      category: "Tactical",
    },

    // PHYSICAL
    {
      id: "30000000-0000-0000-0000-000000000001",
      key: "SpeedAcceleration",
      label: "Ταχύτητα / Επιτάχυνση",
      category: "Physical",
    },
    {
      id: "30000000-0000-0000-0000-000000000002",
      key: "Endurance",
      label: "Αντοχή",
      category: "Physical",
    },
    {
      id: "30000000-0000-0000-0000-000000000003",
      key: "StrengthInDuels",
      label: "Δύναμη στις μονομαχίες",
      category: "Physical",
    },
    {
      id: "30000000-0000-0000-0000-000000000004",
      key: "JumpingBalance",
      label: "Άλμα / Σωματική ισορροπία",
      category: "Physical",
    },

    // MENTAL
    {
      id: "40000000-0000-0000-0000-000000000001",
      key: "Concentration",
      label: "Συγκέντρωση / Προσοχή",
      category: "Mental",
    },
    {
      id: "40000000-0000-0000-0000-000000000002",
      key: "PressureReaction",
      label: "Αντίδραση σε πίεση / λάθος",
      category: "Mental",
    },
    {
      id: "40000000-0000-0000-0000-000000000003",
      key: "InitiativeCourage",
      label: "Πρωτοβουλία / Θάρρος",
      category: "Mental",
    },
    {
      id: "40000000-0000-0000-0000-000000000004",
      key: "Agility",
      label: "Προσαρμοστικότητα",
      category: "Mental",
    },
    {
      id: "40000000-0000-0000-0000-000000000005",
      key: "MentalStamina",
      label: "Ανθεκτικότητα / Νοοτροπία εξέλιξης",
      category: "Mental",
    },

    // SOCIAL
    {
      id: "50000000-0000-0000-0000-000000000001",
      key: "Teamwork",
      label: "Συνεργασία με συμπαίκτες",
      category: "Social",
    },
    {
      id: "50000000-0000-0000-0000-000000000002",
      key: "RespectForCoaches",
      label: "Σεβασμός σε προπονητές / κανόνες",
      category: "Social",
    },
    {
      id: "50000000-0000-0000-0000-000000000003",
      key: "Attendance",
      label: "Παρουσία στις προπονήσεις",
      category: "Social",
    },
    {
      id: "50000000-0000-0000-0000-000000000004",
      key: "CommunicationLeadership",
      label: "Επικοινωνία / Ηγετικά στοιχεία",
      category: "Social",
    },
  ];

  let ratings: Record<string, number> = {};
  let selectedCategories: string[] = [];

  function handleRatingChange(metricId: string, value: number) {
    ratings[metricId] = value;
  }

  function handleCategoryChange(categoryKey: string) {
    // Check if the key is already in the list of selected/hidden categories
    if (selectedCategories.includes(categoryKey)) {
      // Remove the category key from the array
      selectedCategories = selectedCategories.filter((c) => c !== categoryKey);
    } else {
      // Add the category key to the array
      selectedCategories = [...selectedCategories, categoryKey]; // Use spread operator to trigger reactivity
    }
  }
  function getCategoryClass(category: string): string {
    const catClass = selectedCategories.includes(category) ? "is-hidden" : "";

    console.log(`Category Class ${category}:`, catClass);
    return catClass;
  }
  function getMetricsByCategory(category: string): Metric[] {
    return metrics.filter((m) => m.category === category);
  }

  function calculateOverallAverage(): number {
    const allRatings = Object.values(ratings).filter((r) => r > 0);
    if (allRatings.length === 0) return 0;
    const sum = allRatings.reduce((acc, r) => acc + r, 0);
    return Math.round((sum / allRatings.length) * 10) / 10;
  }

  // Email functionality
  let recipientEmail = "";
  let playerName = "";
  let coachName = "";
  let teamName = "";

  // Validate email format
  $: isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail);

  function handleSendEmail() {
    if (!recipientEmail) {
      alert("Please enter an email address");
      return;
    }

    // TODO: Implement actual email sending logic
    console.log("Sending evaluation to:", recipientEmail);
    console.log("Ratings:", ratings);
    alert(`Evaluation results will be sent to ${recipientEmail}`);
  }
</script>

<main class="section">
  <div class="container">
    <!-- Header -->
    <div class="has-text-centered mb-6">
      <h1 class="title is-2 has-text-weight-bold">
        ⚽ Football Player Evaluation
      </h1>
      <p class="subtitle is-4 mt-3">
        Comprehensive assessment tool for coaches
      </p>
    </div>
    <!-- Player Information-->
    <div class="box mt-6">
      <div class="field">
        <label class="label"
          >Player Name (Όνομα παίχτη)
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Enter player's name"
              bind:value={playerName}
            />
          </div>
        </label>
      </div>
       <div class="field">
        <label class="label"
          >Team Name (Ομάδα παίχτη)
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Enter team name"
              bind:value={teamName}
            />
          </div>
        </label>
      </div>
      <div class="field">
        <label class="label"
          >Coach Name (Όνομα προπονητή)
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Enter coach's name"
              bind:value={coachName}
            />
          </div>
        </label>
      </div>
      
    </div>
    <div class="has-text-centered mt-3 mb-3">
      <p class="is-size-6 is-italic">
        <small>Select the metric categories for evaluation <br /></small>
        <small>Επιλέξτε τις κατηγορίες μετρήσεων προς αξιολόγηση</small>
      </p>
    </div>
    <div class="box">
      <div class="checkboxes">
        {#each Object.entries(categories) as [categoryKey, categoryLabel]}
          <div class="row">
            <label class="checkbox">
              <input
                type="checkbox"
                on:change={() => handleCategoryChange(categoryKey)}
              />
              {categoryLabel}
            </label>
          </div>
        {/each}
      </div>
    </div>
    <!-- Overall Score Card -->
    <div class="box mb-5">
      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <h2 class="title is-4 mb-0">Overall Score</h2>
        <div class="title is-2 has-text-warning mb-0">
          {calculateOverallAverage().toFixed(1)}/5.0
        </div>
      </div>
    </div>
    <div class="has-text-centered mt-3 mb-3">
      <p class="is-size-6 is-italic">
        Click on stars to rate each metric from 1 to 5
      </p>
    </div>
    <!-- Metrics by Category -->
    <div class="columns is-multiline">
      {#each Object.entries(categories) as [categoryKey, categoryLabel]}
        <div
          class="column is-half"
          class:is-hidden={!selectedCategories.includes(categoryKey)}
        >
          <MetricCategoryCard
            {categoryKey}
            {categoryLabel}
            metrics={getMetricsByCategory(categoryKey)}
            {ratings}
            onRatingChange={handleRatingChange}
          />
        </div>
      {/each}
    </div>
    <!-- Email Section -->
    <div class="box mt-6">
      <h3 class="title is-5 mb-4">Send Evaluation Results</h3>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            class="input"
            type="email"
            placeholder="Enter email address"
            bind:value={recipientEmail}
          />
        </div>
        <div class="control">
          <button
            class="button is-info"
            on:click={handleSendEmail}
            disabled={!isValidEmail}
          >
            <span class="icon">
              <i class="fas fa-envelope"></i>
            </span>
            <span>Send Results</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :global(html) {
    color-scheme: light;
  }
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
