/* ==========================================================
   roster.js — the ONE place to edit talent.
   Every page (home, women, men, model profiles) reads this list.

   To add a model:
     1. Drop their photos in images/models/<their-id>/ (01.jpg, 02.jpg …)
     2. Copy one block below, change id / name / division / stats
     3. First photo = card cover, second photo = hover image
   ========================================================== */

// Builds ["images/models/<slug>/01.jpg", …] — pass how many photos the folder has
const photos = (slug, n) =>
  Array.from({ length: n }, (_, i) => `images/models/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);

// Placeholder measurements (swap per model)
const SAMPLE_STATS = { Height: `5'9"`, Bust: `34"`, Waist: `24"`, Hips: `34"`, Shoe: "10", Eyes: "Brown", Hair: "Black" };

window.ROSTER = [
  /* ---------------- WOMEN ---------------- */
  { id: "aria-carmona", name: "Aria Carmona", division: "women", featured: true,
    instagram: "aria.glo", stats: SAMPLE_STATS, images: photos("aria-carmona", 10) },

  { id: "model-02", name: "Placeholder 02", division: "women", featured: true,
    stats: SAMPLE_STATS, images: photos("model-02", 4) },
  { id: "model-03", name: "Placeholder 03", division: "women",
    stats: SAMPLE_STATS, images: photos("model-03", 3) },
  { id: "model-04", name: "Placeholder 04", division: "women", featured: true,
    stats: SAMPLE_STATS, images: photos("model-04", 3) },
  { id: "model-05", name: "Placeholder 05", division: "women",
    stats: SAMPLE_STATS, images: photos("model-05", 4) },
  { id: "model-06", name: "Placeholder 06", division: "women",
    stats: SAMPLE_STATS, images: photos("model-06", 3) },
  { id: "model-07", name: "Placeholder 07", division: "women",
    stats: SAMPLE_STATS, images: photos("model-07", 4) },
  { id: "model-08", name: "Placeholder 08", division: "women",
    stats: SAMPLE_STATS, images: photos("model-08", 4) },

  /* ---------------- MEN ---------------- */
  { id: "men-01", name: "Placeholder 01", division: "men", featured: true,
    stats: SAMPLE_STATS, images: photos("men-01", 3) },
  { id: "men-02", name: "Placeholder 02", division: "men",
    stats: SAMPLE_STATS, images: photos("men-02", 3) },
  { id: "men-03", name: "Placeholder 03", division: "men",
    stats: SAMPLE_STATS, images: photos("men-03", 3) },
  { id: "men-04", name: "Placeholder 04", division: "men",
    stats: SAMPLE_STATS, images: photos("men-04", 3) }
];
