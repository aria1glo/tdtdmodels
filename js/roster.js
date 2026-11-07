/* ==========================================================
   roster.js — the ONE place to edit talent.
   Every page (home, women, men, model profiles) reads this list.

   To add a model:
     1. Drop their photos in images/models/<their-id>/ (01.jpg, 02.jpg …)
     2. Copy one block below and change id / name / division / instagram / stats / images
     3. First photo = card cover, second photo = hover image
   Leave `stats` out (or empty) if you don't have measurements yet.
   ========================================================== */

// Builds ["images/models/<slug>/01.jpg", …] — pass how many photos the folder has
const photos = (slug, n) =>
  Array.from({ length: n }, (_, i) => `images/models/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);

window.ROSTER = [
  /* ---------------- WOMEN ---------------- */
  { id: "aria-carmona", name: "Aria Carmona", division: "women", featured: true, instagram: "aria.glo",
    stats: { Height: `5'9"`, Bust: `34"`, Waist: `24"`, Hips: `34"`, Shoe: "10", Eyes: "Brown", Hair: "Black" },
    images: photos("aria-carmona", 10) },

  { id: "kiyana-simmons", name: "Kiyana Simmons", division: "women", featured: true, instagram: "pretti_beyond",
    stats: { Height: `5'2"`, Bust: `36"`, Waist: `33"`, Hips: `42"`, Shoe: "8", Eyes: "Brown", Hair: "Black" },
    images: photos("kiyana-simmons", 5) },

  { id: "laura-brooks", name: "Laura Brooks", division: "women", instagram: "laurasosexc",
    stats: { Height: `5'7"`, Bust: `34"`, Waist: `29"`, Hips: `44"`, Dress: "M", Shoe: "9", Eyes: "Brown", Hair: "Brown" },
    images: photos("laura-brooks", 4) },

  { id: "sanna-jackman", name: "Sanna Jackman", division: "women", instagram: "sannaa.j_",
    stats: { Height: `6'0"`, Bust: `36"`, Waist: `28"`, Hips: `43"`, Eyes: "Brown", Hair: "Black" },
    images: photos("sanna-jackman", 5) },

  { id: "lea-benjamin", name: "Lea Benjamin", division: "women", featured: true, instagram: "l.eabenjamin",
    images: photos("lea-benjamin", 1) },

  { id: "lauren-dong", name: "Lauren Dong", division: "women", instagram: "laurenddong",
    images: photos("lauren-dong", 1) },

  { id: "sira", name: "Sira", division: "women", instagram: "sira.ashh",
    images: photos("sira-ashh", 1) },

  { id: "elohelyza", name: "Elohelyza", division: "women", instagram: "elohelyza",
    images: photos("elohelyza", 2) },

  { id: "naumaree", name: "Naumaree", division: "women", instagram: "naumaree",
    images: photos("naumaree", 1) },

  { id: "lya", name: "Lya", division: "women",
    images: photos("lya", 1) },

  { id: "ashley", name: "Ashley", division: "women", instagram: "ashleyswave",
    images: photos("ashley", 1) },

  { id: "cay", name: "Cay", division: "women", instagram: "cayyfendii",
    images: photos("cay", 2) },

  { id: "tia", name: "Tia", division: "women",
    images: photos("tia", 2) },

  { id: "phylicia", name: "Phylicia", division: "women", instagram: "phyliciaaxo",
    images: photos("phylicia", 2) },

  { id: "val", name: "Val", division: "women", instagram: "val3m0r",
    images: photos("val3m0r", 2) },

  { id: "amara-lopez", name: "Amara Lopez", division: "women", instagram: "valloryliz",
    images: photos("amara-lopez", 2) },

  /* ---------------- MEN ---------------- */
  { id: "radames", name: "Radames", division: "men", featured: true, instagram: "itz_radames",
    images: photos("radames", 1) },

  { id: "jacob-fields", name: "Jacob Fields", division: "men", instagram: "itboyjayke",
    stats: { Height: `6'0"`, Chest: `36"`, Waist: `30.5"` },
    images: photos("jacob-fields", 4) },

  { id: "manpal-singh", name: "Manpal Singh", division: "men", instagram: "manpal01",
    images: photos("manpal-singh", 2) },

  { id: "k3v", name: "K3V", division: "men", instagram: "blvck.fang",
    images: photos("k3v", 2) },

  { id: "chibuike-onukaogu", name: "Chibuike Onukaogu", division: "men", instagram: "chibuike_onukaogu",
    images: photos("chibuike-onukaogu", 2) }
];
