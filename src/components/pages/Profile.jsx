import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import userService from "../../services/userService";
import authService from "../../services/authService";
import tripService from "../../services/tripService";
import { useAuth } from "../../context/useAuth";
import clint1 from "../../assets/general/clint1.jpg";
import dahab from "../../assets/cities/dahab.jpg";
import fullHeart from "../../assets/icons/fullHeart.png";
import uisCalender from "../../assets/icons/uis_calender.png";
import pin from "../../assets/icons/pin.png";
import tripsIcon from "../../assets/icons/trips.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import luxor from "../../assets/cities/luxor.jpg";
import siwa from "../../assets/cities/siwa.jpg";

// ════════════════════════════════════════════════════════════════════
// ⚠️ DUMMY DATA SECTION — TEMPORARY, NOT CONNECTED TO BACKEND YET ⚠️
// ════════════════════════════════════════════════════════════════════
// كل البيانات من هنا لحد آخر السكشن دي (لحد ما تلاقي ينتهي بـ
// "END DUMMY DATA SECTION") هي بيانات وهمية بس، مش جايه من الـ API.
//
// السبب: الـ backend لسه مش مظبط فيه save/get لرحلات اليوزر بشكل كامل.
// لحد ما نتأكد إن الـ API بتاع التروبس شغال 100% (create/get/delete trip)
// هنسيب البيانات دي زي ما هي عشان نقدر نكمل تصميم وعرض الصفحة.
//
// ✅ لما الباك يخلص ويتأكد إن الـ API شغال:
//   1. امسحي كل الـ const اللي تحت دي (userData, interests, upcomingTrips,
//      allTrips, draftTrips, completedTrips, reviews)
//   2. اربطي البيانات دي بالـ apiTrips / dashboardData / apiInterests
//      اللي بترجع من tripService و userService بدل الداتا الوهمية
//   3. دوري في الـ JSX على كل مكان بيستخدم upcomingTrips / allTrips /
//      draftTrips / completedTrips / reviews / userData.stats
//      واستبدليه بالبيانات الحقيقية
// ════════════════════════════════════════════════════════════════════
const userData = {
  name: "Zeina Ahmed",
  bio: "Chasing sunrises, collecting stories.",
  location: "Cairo, Egypt",
  avatar: clint1,
  stats: [
    {
      value: 12,
      label: "Trips Completed",
      icon: <img src={tripsIcon} alt="trips" width="24" height="24" />,
    },
    {
      value: 47,
      label: "Saved Places",
      icon: <img src={fullHeart} alt="saved" width="24" height="24" />,
    },
    {
      value: 3,
      label: "Upcoming Trips",
      icon: <img src={uisCalender} alt="upcoming" width="24" height="24" />,
    },
    {
      value: 8,
      label: "Cities Visited",
      icon: <img src={pin} alt="cities" width="24" height="24" />,
    },
  ],
};

const interests = [
  { label: "Nature & Oasis", emoji: "🌿", active: true },
  { label: "Islamic Architecture & Arts", emoji: "🕌", active: false },
  { label: "Mountains & Highs", emoji: "⛺", active: false },
  { label: "Hidden Gems", emoji: "💎", active: true },
  { label: "Historical Sites & Ruins", emoji: "🏛️", active: false },
  { label: "Coastal Escapes", emoji: "🏖️", active: false },
  { label: "Shopping & Nightlife", emoji: "🛍️", active: true },
  { label: "Local Culture & Folklore", emoji: "🌐", active: false },
  { label: "Diving & Marine Life", emoji: "🤿", active: false },
  { label: "Family Friendly", emoji: "👨‍👩‍👧", active: true },
  { label: "Relaxation & Wellness", emoji: "🧘", active: true },
  { label: "Adventure & Sports", emoji: "🏋️", active: false },
  { label: "Local Cuisine", emoji: "🍽️", active: true },
  { label: "Desert Safari", emoji: "🐪", active: false },
];

const upcomingTrips = [
  {
    id: 1,
    title: "Dahab Retreat",
    date: "Oct 15 - Oct 20",
    location: "South Sinai, Egypt",
    description:
      "A perfect blend of coastal escapes and hidden gems tailored just for you.",
    image: dahab,
    highlights: [
      "Dive at the Canyon",
      "Bedouin Dinner Under Stars",
      "Snorkel the Blue Hole",
    ],
    aiPlanned: true,
  },
];

const allTrips = [
  {
    id: 1,
    title: "Aswan Golden Sun",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 2,
    title: "Siwa Oasis Escape",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 3,
    title: "Historic Cairo Walk",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 4,
    title: "Marsa Alam Dive",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 5,
    title: "Alex Sea Breeze",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 6,
    title: "Sinai Mountain Trail",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
];

const draftTrips = [
  {
    id: 1,
    title: "El Gouna Weekend Retreat",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 2,
    title: "Abu Simbel Sun Festival",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 3,
    title: "Sharm El Sheikh Vibes",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 4,
    title: "Taba Heights Getaway",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 5,
    title: "Sahl Hasheesh Chill",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 6,
    title: "Wadi El Hitan Camp",
    lastEdited: "2 hours ago",
    progress: 60,
  },
];

const reviews = [
  {
    id: 1,
    place: "Dahab Blue Vibe",
    rating: 5,
    date: "20 May 2026",
    text: "Absolutely magical! The AI planner suggested hidden diving spots we would never have found on our own. The itinerary was perfectly paced, giving us enough time to relax at the Blue Hole.",
    image: dahab,
  },
  {
    id: 2,
    place: "Luxor Historic AI Walk",
    rating: 4,
    date: "20 May 2026",
    text: "The AI planner perfectly balanced visiting the main temples with finding quiet local spots for lunch. Truly felt like traveling with a local expert!",
    image: luxor,
  },
  {
    id: 3,
    place: "Siwa Oasis Retreat",
    rating: 4,
    date: "20 May 2026",
    text: "I wanted a full detox and the app delivered. The suggested eco-lodges were exactly my style, and the stargazing itinerary was magical.",
    image: siwa,
  },
];

const completedTrips = [
  {
    id: 1,
    title: "Siwa Oasis Retreat",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 2,
    title: "Dahab Blue Vibe",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 3,
    title: "Egypt Adventure",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 4,
    title: "Aswan Wonders",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 5,
    title: "Red Sea Escape",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 6,
    title: "Luxor Heritage",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
];

const termsData = [
  {
    section: "1. Acceptance of Terms",
    points: [
      "Agree to be bound by MindTrip Terms of Service.",
      "Comply with all applicable laws and regulations.",
      "Unauthorized access or use of this site is prohibited.",
    ],
  },
  {
    section: "2. How We Use Your Data",
    points: [
      "Personalize travel recommendations based on your preferences.",
      "Improve AI algorithms for better accuracy.",
      "Provide dedicated customer support.",
      "Note:  We do not sell your personal data to third parties.",
    ],
    noteIndex: 3,
  },
  {
    section: "3. Data Security",
    points: [
      "Industry-standard security measures to protect your information.",
      "Secure data transmission over the internet.",
      "Continuous monitoring to prevent unauthorized access.",
    ],
  },
  {
    section: "4. Cookies & Tracking",
    points: [
      "Enhance your browsing experience.",
      "Analyze site traffic and user behavior.",
      "Manage cookie preferences through browser settings.",
    ],
  },
  {
    section: "5. User Responsibility",
    points: [
      "You are responsible for verifying all travel details, including dates, prices, and locations.",
      "MindTrip acts as an AI assistant and is not liable for any external booking errors or travel disruptions.",
      "You must ensure you have the necessary travel documents (Passports, Visas) before your trip.",
    ],
  },
  {
    section: "6. Prohibited Use",
    points: [
      "You may not use the app to generate harmful, illegal, or misleading content.",
      "Attempting to hack, decompile, or disrupt the app's AI algorithms is strictly prohibited.",
      "Automated scraping of trip data for commercial use without permission is not allowed.",
    ],
  },
  {
    section: "7. Intellectual Property",
    points: [
      "All AI-generated designs, logos, and software are the property of MindTrip.",
      "Users retain ownership of their personal trip photos and reviews uploaded to the platform.",
    ],
  },
  {
    section: "8. Changes to Terms",
    points: [
      "We reserve the right to update these terms at any time to reflect new features or laws.",
      "Continued use of the app after updates constitutes your acceptance of the new terms.",
    ],
  },
];

const userPolicyData = [
  {
    section: "1. Information We Collect",
    points: [
      "Basic Identity: We collect information such as your name, email address, and profile picture when you create an account.",
      "Travel Preferences: To personalize your experience, we store data about your favorite destinations and travel style.",
      "Device Data: Technical information like IP addresses and browser types are collected for security and analytics.",
    ],
  },
  {
    section: "2. How We Use Your Data",
    points: [
      "AI Personalization: Your data is used to feed our AI engine to generate travel recommendations tailored specifically for you.",
      "App Functionality: To ensure a smooth experience when saving trips or managing your profile.",
      "Communication: We use your contact details to send trip updates, security alerts, and support messages.",
    ],
  },
  {
    section: "3. Location Data",
    points: [
      "Nearby Suggestions: We use your real-time location to suggest hidden gems and attractions near you.",
      "Map Integration: Location data helps us provide accurate directions and local travel options.",
      "Control: You can enable or disable location services at any time through your device settings.",
    ],
  },
  {
    section: "4. Data Security",
    points: [
      "Encryption: All personal data is encrypted using industry-standard protocols during transmission and storage.",
      "Monitoring: We perform regular security audits to protect against unauthorized access or data breaches.",
      "Safe Storage: Your information is securely hosted using Firebase and Cloud Firestore technologies.",
    ],
  },
  {
    section: "5. Data Sharing",
    points: [
      "No Data Selling: We strictly do not sell, rent, or trade your personal data to any third-party marketers.",
      "Service Providers: Data is only shared with trusted partners (like hotel/flight APIs) necessary to fulfill your travel requests.",
      "Legal Compliance: We may disclose information if required by law to protect our rights or comply with legal processes.",
    ],
  },
  {
    section: "6. Your Rights",
    points: [
      "Full Access: You have the right to access and download a copy of all the data we store about you.",
      "Edit & Delete: You can update your information or permanently delete your account and data via the Settings page.",
      "Privacy Control: You can manage your notification and tracking preferences directly within the app.",
    ],
  },
  {
    section: "7. Changes to This Policy",
    points: [
      "Policy Updates: We may update this policy occasionally to reflect new features or legal requirements.",
      "Notifications: Users will be notified of significant changes to this policy via in-app or email.",
      "Acceptance: Continued use of MindTrip after updates constitutes your acceptance of the revised User Policy.",
    ],
  },
];

const faqsData = [
  {
    q: "What is MindTrip?",
    a: "MindTrip is an AI-powered Egyptian travel planning app that helps you discover and plan personalized trips across Egypt.",
  },
  {
    q: "How does MindTrip create trip recommendations?",
    a: "Our AI analyzes your travel interests, budget, and preferred style to suggest customized itineraries across Egypt's top destinations.",
  },
  {
    q: "How can I plan a trip in the app?",
    a: "Simply go to the Trip Planner, choose your destination and dates, and let the AI build a full itinerary for you in seconds.",
  },
  {
    q: "Can I save my favorite destinations?",
    a: "Yes! Tap the heart icon on any place or trip to save it to your profile under Saved Places.",
  },
  {
    q: "Can I edit a planned trip?",
    a: "Absolutely. Open any trip from My Trips, tap Edit, and customize stops, dates, or activities as you wish.",
  },
  {
    q: "Why are recommendations different for each user?",
    a: "MindTrip personalizes suggestions based on your unique interests, past trips, and travel behavior — no two profiles get the same plan.",
  },
  {
    q: "Is my data safe in MindTrip?",
    a: "Yes. We follow strict data privacy standards. Your personal info is never sold or shared without your consent.",
  },
];

// ── Adapter: يحوّل الـ dummy trips لنفس شكل بيانات الـ API ──────────
// (tripId, destinationGovernorate, startDate, endDate, durationDays,
//  totalBudgetEgp, days[].locations, status) عشان كروت العرض تشتغل
// بنفس الكود بالظبط سواء الداتا حقيقية أو وهمية.
// مجموعة الصور المتاحة عشان نلف عليها لكل كارت dummy (نفس الصور اللي
// كانت مستخدمة في النسخة الأصلية)
const dummyTripImages = [dahab, luxor, siwa];

const buildDummyApiTrip = (t, statusLabel, idx) => ({
  tripId: `dummy-${statusLabel}-${t.id}`,
  destinationGovernorate: t.title,
  startDate: "2026-05-16T00:00:00Z",
  endDate: "2026-05-21T00:00:00Z",
  durationDays: t.days || 5,
  totalBudgetEgp: 8000,
  status: statusLabel,
  image: t.image || dummyTripImages[idx % dummyTripImages.length], // ← الصورة
  lastUpdated: t.lastUpdated || "11/5/2026 at 5:00pm",
  days: [
    {
      locations: (t.highlights || [])
        .filter((h) => !h.startsWith("+"))
        .map((h) => ({ nameEn: h })),
    },
  ],
});

const dummyApiTrips = [
  ...allTrips.map((t, i) => buildDummyApiTrip(t, "Upcoming", i)),
  ...draftTrips.map((t, i) => buildDummyApiTrip(t, "Planning", i)),
  ...completedTrips.map((t, i) => buildDummyApiTrip(t, "Completed", i)),
];

// ════════════════════════════════════════════════════════════════════
// END DUMMY DATA SECTION
// ════════════════════════════════════════════════════════════════════

const tabs = ["Overview", "My Trips", "Reviews", "Settings"];
const tripFilters = ["ALL", "Upcoming", "Drafts", "Completed"];

// ===== Profile Page =====
const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.displayName || "Traveler";
  const [activeTab, setActiveTab] = useState("Overview");
  // ── real API data ──
  const [profileData, setProfileData] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalTrips: 0,
    totalReviews: 0,
    totalSaved: 0,
  });
  const [apiTrips, setApiTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [apiInterests, setApiInterests] = useState([]);
  // ── interests edit modal ──
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [tempInterests, setTempInterests] = useState([]);
  const [interestsSaving, setInterestsSaving] = useState(false);
  // ── write-a-review modal ──
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSaving, setReviewSaving] = useState(false);
  // ── logout ──
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  // ── change-password state ──
  const [cpCurrent, setCpCurrent] = useState("");
  const [cpNew, setCpNew] = useState("");
  const [cpConfirm, setCpConfirm] = useState("");
  const [cpLoading, setCpLoading] = useState(false);
  const [cpError, setCpError] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [showAllTrips, setShowAllTrips] = useState(false);
  const [showAllDrafts, setShowAllDrafts] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeSetting, setActiveSetting] = useState(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showProfileSavedModal, setShowProfileSavedModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    username: "@zeina_ahmed",
    phone: "0128 514 6324",
    bio: "Chasing sunrises, collecting stories.",
    interests: [
      "Nature & Oasis",
      "Hidden Gems",
      "Shopping & Nightlife",
      "Family Friendly",
      "Relaxation & Wellness",
      "Local Cuisine",
    ],
  });

  React.useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setProfileLoading(true);
      setProfileError(null);
      try {
        // GET /api/v1/users/me
        const profileRes = await userService.getMyProfile();
        const p = profileRes.data;
        if (p) {
          setProfileData(p);
          setApiInterests(p.interests ?? []);
          setEditProfileData((prev) => ({
            ...prev,
            fullName: p.displayName || prev.fullName,
            email: p.email || prev.email,
            username: p.username ? `@${p.username}` : prev.username,
            phone: p.phoneNumber || prev.phone,
            bio: p.bio || prev.bio,
            interests: p.interests ?? prev.interests,
          }));
        }
        // GET /api/v1/users/me/dashboard
        const dashRes = await userService.getDashboard();
        if (dashRes.data) setDashboardData(dashRes.data);

        // GET /api/v1/trips
        setTripsLoading(true);
        const tripsRes = await tripService.getTrips({ Page: 1, PageSize: 50 });
        const items = tripsRes.data?.items ?? tripsRes.data ?? [];
        setApiTrips(items);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setProfileError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load profile",
        );
      } finally {
        setProfileLoading(false);
        setTripsLoading(false);
      }
    };
    if (user?.userId) fetchAll();
  }, [user?.userId]);

  const handleSaveProfile = async () => {
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      // PATCH /api/v1/users/me
      await userService.updateProfile({
        displayName: editProfileData.fullName,
        username: editProfileData.username?.replace(/^@/, "") || undefined,
        phoneNumber: editProfileData.phone || undefined,
        bio: editProfileData.bio || undefined,
      });
      // PUT /api/v1/users/me/interests
      if (editProfileData.interests?.length) {
        await userService.updateInterests(editProfileData.interests);
        setApiInterests(editProfileData.interests);
      }
      setShowEditProfileModal(false);
      setShowProfileSavedModal(true);
    } catch (err) {
      console.error("Profile update error:", err);
      setUpdateError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // ── Save interests from Overview edit ──────────────────────────────────────
  const handleSaveInterests = async () => {
    setInterestsSaving(true);
    try {
      await userService.updateInterests(tempInterests);
      setApiInterests(tempInterests);
      setEditProfileData((prev) => ({ ...prev, interests: tempInterests }));
      setShowInterestsModal(false);
      showToast("Interests updated!");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to save interests",
        "error",
      );
    } finally {
      setInterestsSaving(false);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) await authService.logout(refreshToken);
    } catch (_) {
      /* ignore */
    } finally {
      authService.clearTokens();
      if (window.navigateToSignIn) {
        window.navigateToSignIn();
      } else {
        navigate("/signin");
      }
    }
  };

  // ── Change Password ────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!cpCurrent || !cpNew || !cpConfirm) {
      setCpError("All fields are required.");
      return;
    }
    if (cpNew !== cpConfirm) {
      setCpError("New passwords do not match.");
      return;
    }
    if (cpNew.length < 8) {
      setCpError("Password must be at least 8 characters.");
      return;
    }
    setCpLoading(true);
    setCpError("");
    try {
      await authService.changePassword(cpCurrent, cpNew, cpConfirm);
      setShowChangePasswordModal(false);
      setCpCurrent("");
      setCpNew("");
      setCpConfirm("");
      showToast("Password updated successfully!");
    } catch (err) {
      setCpError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setCpLoading(false);
    }
  };

  // ── Submit Review ──────────────────────────────────────────────────────────
  const handleSubmitReview = async () => {
    if (!reviewTarget?.locationId) {
      showToast("No location to review", "error");
      return;
    }
    setReviewSaving(true);
    try {
      // POST /api/v1/reviews — locationId comes from the trip's first location
      const { default: apiClient } = await import("../../services/apiClient");
      await apiClient.post("/reviews", {
        locationId: reviewTarget.locationId,
        rating: reviewRating,
        reviewText: reviewText || undefined,
      });
      setShowReviewModal(false);
      setReviewText("");
      setReviewRating(5);
      showToast("Review submitted!");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to submit review.",
        "error",
      );
    } finally {
      setReviewSaving(false);
    }
  };

  // ── Delete Account ─────────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    try {
      // DELETE /api/v1/users/me
      const { default: apiClient } = await import("../../services/apiClient");
      await apiClient.delete("/users/me");
    } catch (_) {
      /* ignore */
    } finally {
      authService.clearTokens();
      if (window.navigateToSignIn) {
        window.navigateToSignIn();
      } else {
        navigate("/signin");
      }
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Map API trips to sections ────────────────────────────────────────────────
  // TripStatus enum: 0=Planning/Draft, 1=Upcoming, 2=Active, 3=Completed, 4=Cancelled

  // ⚠️ DUMMY FALLBACK — TEMPORARY: لو الـ API رجع مفيش trips حقيقية (array فاضية)
  // وخلصنا التحميل، بنستخدم الـ dummyApiTrips بدالها عشان نقدر نشوف شكل الصفحة.
  // ✅ لما الباك يخلص ويتأكد إن كل اليوزرز عندهم trips حقيقية، امسحي السطر اللي
  // فيه "effectiveTrips" واستبدليه بـ: const effectiveTrips = apiTrips;
  const effectiveTrips =
    !tripsLoading && apiTrips.length === 0 ? dummyApiTrips : apiTrips;

  const upcomingFiltered = effectiveTrips
    .filter(
      (t) => t.status === "Upcoming" || t.status === "1" || t.status === 1,
    )
    .filter((t) =>
      (t.destinationGovernorate ?? t.title ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

  const draftsFiltered = effectiveTrips
    .filter(
      (t) => t.status === "Planning" || t.status === "0" || t.status === 0,
    )
    .filter((t) =>
      (t.destinationGovernorate ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

  const completedFiltered = effectiveTrips
    .filter(
      (t) => t.status === "Completed" || t.status === "3" || t.status === 3,
    )
    .filter((t) =>
      (t.destinationGovernorate ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

  // helper: format API trip date
  const fmtDate = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <>
      <Navbar activePage="profile" />
      <div className="profile-page">
        {/* ===== Cover Photo ===== */}
        <div className="profile-cover">
          <img src={dahab} alt="cover" className="cover-img" />
        </div>

        {/* ===== Profile Header ===== */}
        <div className="profile-header-wrap">
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar-wrap">
                <img
                  src={profileData?.profilePhotoUrl || userData.avatar}
                  alt={profileData?.displayName || userData.name}
                  className="profile-avatar"
                />
                <button className="avatar-edit-btn" title="Change photo">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="profile-info">
                <h2 className="profile-name">
                  {profileData?.displayName || displayName}
                </h2>
                <p className="profile-bio">
                  {profileData?.bio || "Chasing sunrises, collecting stories."}
                </p>
                <p className="profile-location">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5596fe"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {profileData?.homeGovernorate || "Egypt"}
                </p>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="edit-profile-btn"
                onClick={() => setShowEditProfileModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* ===== Tabs ===== */}
          <div className="profile-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`profile-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Tab Content ===== */}
        <div className="profile-content">
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === "Overview" && (
            <div className="overview-tab">
              {profileError && (
                <div
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  {profileError}
                </div>
              )}
              <div className="welcome-card">
                <h3>
                  Welcome back,{" "}
                  <span className="blue-name">{displayName.split(" ")[0]}</span>
                </h3>

                <p>Ready for your next Trip?</p>
              </div>

              <div className="stats-grid">
                {[
                  {
                    value: dashboardData.totalTrips,
                    label: "Trips Completed",
                    icon: (
                      <img src={tripsIcon} alt="trips" width="24" height="24" />
                    ),
                  },
                  {
                    value: dashboardData.totalSaved,
                    label: "Saved Places",
                    icon: (
                      <img src={fullHeart} alt="saved" width="24" height="24" />
                    ),
                  },
                  {
                    value: upcomingFiltered.length,
                    label: "Upcoming Trips",
                    icon: (
                      <img
                        src={uisCalender}
                        alt="upcoming"
                        width="24"
                        height="24"
                      />
                    ),
                  },
                  {
                    value: dashboardData.totalReviews,
                    label: "Reviews Written",
                    icon: (
                      <img src={pin} alt="reviews" width="24" height="24" />
                    ),
                  },
                ].map((stat, i) => (
                  <div className="stat-card" key={i}>
                    <div className="stat-icon-circle">{stat.icon}</div>
                    <h3 className="stat-value">
                      {profileLoading ? "—" : stat.value}
                    </h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="overview-section">
                <div className="section-card-header">
                  <h4>My Travel Interests</h4>
                  <button
                    className="edit-icon-btn"
                    onClick={() => {
                      setTempInterests([...apiInterests]);
                      setShowInterestsModal(true);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5596fe"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <div className="interests-wrap">
                  {(apiInterests.length
                    ? apiInterests
                    : interests.filter((i) => i.active).map((i) => i.label)
                  ).map((label, i) => {
                    const found = interests.find((x) => x.label === label);
                    return (
                      <span key={i} className="interest-tag active">
                        {found?.emoji} {label}
                      </span>
                    );
                  })}
                  {apiInterests.length === 0 && !profileLoading && (
                    <button
                      className="edit-icon-btn"
                      style={{
                        fontSize: 13,
                        color: "#5596fe",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onClick={() => {
                        setTempInterests([]);
                        setShowInterestsModal(true);
                      }}
                    >
                      + Add interests
                    </button>
                  )}
                </div>
              </div>

              <div className="overview-section">
                <h4>Upcoming Trips</h4>
                {upcomingTrips.map((trip) => (
                  <div className="upcoming-trip-card" key={trip.id}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="trip-thumb"
                    />
                    <div className="trip-left">
                      <h5 className="trip-title">{trip.title}</h5>
                      <p className="trip-date">{trip.date}</p>
                      <p className="trip-desc">{trip.description}</p>
                      <button className="view-itinerary-btn">
                        View Itinerary
                      </button>
                    </div>
                    <div className="trip-right">
                      <h6 className="trip-highlights-title">Trip Highlights</h6>
                      <div className="trip-highlights">
                        {trip.highlights.map((h, i) => (
                          <span key={i} className="highlight-item">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    {trip.aiPlanned && (
                      <span className="ai-badge">✦ AI Planner</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== MY TRIPS TAB ===== */}
          {activeTab === "My Trips" && (
            <div className="trips-tab">
              {/* Filter + Search Bar */}
              <div className="trips-toolbar">
                <div className="trips-filters">
                  {tripFilters.map((f) => (
                    <button
                      key={f}
                      className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                      onClick={() => {
                        setActiveFilter(f);
                        setShowAllTrips(false);
                        setShowAllDrafts(false);
                        setShowAllCompleted(false);
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="trips-search">
                  <div className="search-left">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#999"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for a trip..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <button className="search-sort-btn">
                    <img src={searchIcon} alt="sort" width="20" height="20" />
                  </button>
                </div>
              </div>

              {tripsLoading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#999",
                    fontSize: 14,
                  }}
                >
                  Loading your trips...
                </div>
              )}

              {/* ===== Upcoming Trips Section ===== */}
              {!tripsLoading &&
                (activeFilter === "ALL" || activeFilter === "Upcoming") && (
                  <div className="overview-section">
                    <div className="section-card-header">
                      <h4>Upcoming Trips</h4>
                      <button className="see-all-btn">See All</button>
                    </div>
                    <div className="my-trips-grid">
                      {upcomingFiltered
                        .slice(0, showAllTrips ? undefined : 3)
                        .map((trip) => (
                          <div className="my-trip-card" key={trip.id}>
                            <div className="my-trip-img-wrap">
                              {trip.image ? (
                                <img
                                  src={trip.image}
                                  alt={trip.title}
                                  className="my-trip-img"
                                />
                              ) : (
                                <div className="no-img-placeholder">
                                  <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ccc"
                                    strokeWidth="1.5"
                                  >
                                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                  </svg>
                                </div>
                              )}
                              <span className="trip-status-badge">
                                {trip.status}
                              </span>
                              <div style={{ position: "relative" }}>
                                <button
                                  className="trip-more-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(
                                      openMenuId === `up-${trip.id}`
                                        ? null
                                        : `up-${trip.id}`,
                                    );
                                  }}
                                >
                                  ⋮
                                </button>
                                {openMenuId === `up-${trip.id}` && (
                                  <div className="trip-dropdown">
                                    <button className="dropdown-item">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </svg>
                                      Open
                                    </button>
                                    <button className="dropdown-item">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                      </svg>
                                      Rename
                                    </button>
                                    <button className="dropdown-item">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                                        <polyline points="16 6 12 2 8 6" />
                                        <line x1="12" y1="2" x2="12" y2="15" />
                                      </svg>
                                      Share
                                    </button>
                                    <button className="dropdown-item delete">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4h6v2" />
                                      </svg>
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="my-trip-info">
                              <h5 className="my-trip-title">
                                {trip.destinationGovernorate ??
                                  trip.title ??
                                  "Trip"}
                              </h5>
                              <p className="my-trip-meta">
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#999"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                  />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {fmtDate(trip.startDate)} –{" "}
                                {fmtDate(trip.endDate)}
                              </p>
                              <p className="my-trip-meta">
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#999"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                  />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                  <line x1="9" y1="4" x2="9" y2="20" />
                                </svg>
                                {trip.durationDays ?? "—"} days ·{" "}
                                {trip.totalBudgetEgp?.toLocaleString() ?? "—"}{" "}
                                EGP
                              </p>
                              <div className="my-trip-highlights">
                                {(trip.days?.[0]?.locations ?? [])
                                  .slice(0, 2)
                                  .map((loc, i) => (
                                    <p
                                      key={i}
                                      className="my-trip-highlight-item"
                                    >
                                      • {loc.nameEn ?? loc.nameAr ?? "Place"}
                                    </p>
                                  ))}
                              </div>
                              <button
                                className="view-itinerary-btn"
                                onClick={() =>
                                  navigate(`/trips/${trip.tripId}`)
                                }
                              >
                                View Itinerary
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    {upcomingFiltered.length > 3 && activeFilter !== "ALL" && (
                      <div className="show-more-wrap">
                        <button
                          className="show-more-btn"
                          onClick={() => setShowAllTrips(!showAllTrips)}
                        >
                          {showAllTrips ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              {/* ===== Drafts Section ===== */}
              {!tripsLoading &&
                (activeFilter === "ALL" || activeFilter === "Drafts") && (
                  <div className="overview-section">
                    <div className="section-card-header">
                      <h4>Drafts</h4>
                      <button className="see-all-btn">See All</button>
                    </div>
                    <div className="my-trips-grid">
                      {draftsFiltered
                        .slice(0, showAllDrafts ? undefined : 3)
                        .map((draft) => (
                          <div className="my-trip-card" key={draft.id}>
                            <div className="draft-img-wrap">
                              <span className="trip-status-badge">Draft</span>
                              <div className="draft-img-placeholder">
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#aaa"
                                  strokeWidth="1.5"
                                >
                                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                  <circle cx="12" cy="13" r="4" />
                                </svg>
                              </div>
                            </div>
                            <div className="my-trip-info">
                              <div className="draft-title-row">
                                <h5 className="my-trip-title">{draft.title}</h5>
                                <div style={{ position: "relative" }}>
                                  <button
                                    className="trip-more-btn"
                                    style={{ position: "static" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenMenuId(
                                        openMenuId === `draft-${draft.id}`
                                          ? null
                                          : `draft-${draft.id}`,
                                      );
                                    }}
                                  >
                                    ⋮
                                  </button>
                                  {openMenuId === `draft-${draft.id}` && (
                                    <div className="trip-dropdown">
                                      <button className="dropdown-item">
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                        >
                                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Edit Title
                                      </button>
                                      <button className="dropdown-item delete">
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                        >
                                          <polyline points="3 6 5 6 21 6" />
                                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                          <path d="M10 11v6M14 11v6" />
                                          <path d="M9 6V4h6v2" />
                                        </svg>
                                        Delete Draft
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="draft-edited">
                                Last edited: {draft.lastEdited}
                              </p>
                              <p className="draft-hint">
                                Just 2 steps left to create your magic trip!
                              </p>
                              <div className="draft-progress-wrap">
                                <div className="draft-progress-header">
                                  <span className="draft-progress-label">
                                    Planning Progress
                                  </span>
                                  <span className="draft-progress-pct">
                                    ({draft.progress}%)
                                  </span>
                                </div>
                                <div className="draft-progress-bar">
                                  <div
                                    className="draft-progress-fill"
                                    style={{ width: `${draft.progress}%` }}
                                  />
                                </div>
                              </div>
                              <button className="continue-planning-btn">
                                Continue Planning
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    {draftsFiltered.length > 3 && activeFilter !== "ALL" && (
                      <div className="show-more-wrap">
                        <button
                          className="show-more-btn"
                          onClick={() => setShowAllDrafts(!showAllDrafts)}
                        >
                          {showAllDrafts ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              {/* ===== Completed Trips Section ===== */}
              {!tripsLoading &&
                (activeFilter === "ALL" || activeFilter === "Completed") && (
                  <div className="overview-section">
                    <div className="section-card-header">
                      <h4>Completed Trips</h4>
                      <button className="see-all-btn">See All</button>
                    </div>
                    <div className="my-trips-grid">
                      {completedFiltered
                        .slice(0, showAllCompleted ? undefined : 3)
                        .map((trip) => (
                          <div className="my-trip-card" key={trip.id}>
                            <div className="my-trip-img-wrap">
                              <img
                                src={trip.image}
                                alt={trip.title}
                                className="my-trip-img"
                              />
                              <span className="trip-status-badge">
                                {trip.status}
                              </span>
                              <button className="trip-more-btn">⋮</button>
                            </div>
                            <div className="my-trip-info">
                              <h5 className="my-trip-title">
                                {trip.destinationGovernorate ??
                                  trip.title ??
                                  "Trip"}
                              </h5>
                              <div className="completed-meta-row">
                                <p className="my-trip-meta">
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#999"
                                    strokeWidth="2"
                                  >
                                    <rect
                                      x="3"
                                      y="4"
                                      width="18"
                                      height="18"
                                      rx="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  {trip.durationDays ?? "—"} Days
                                </p>
                                <p className="my-trip-meta">
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#999"
                                    strokeWidth="2"
                                  >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                  </svg>
                                  {trip.destinationGovernorate ?? "Egypt"}
                                </p>
                              </div>
                              <p className="my-trip-meta">
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#999"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                  />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                  <line x1="9" y1="4" x2="9" y2="20" />
                                </svg>
                                {trip.days?.[0]?.locations?.length ?? 0} places
                              </p>
                              <div className="my-trip-highlights">
                                {(trip.days?.[0]?.locations ?? [])
                                  .slice(0, 2)
                                  .map((loc, i) => (
                                    <p
                                      key={i}
                                      className="my-trip-highlight-item"
                                    >
                                      • {loc.nameEn ?? loc.nameAr ?? "Place"}
                                    </p>
                                  ))}
                              </div>
                              <p className="completed-last-updated">
                                Last Updated :{" "}
                                {trip.lastUpdated ?? fmtDate(trip.endDate)}
                              </p>
                              <button
                                className="view-itinerary-btn"
                                style={{
                                  marginTop: 10,
                                  background:
                                    "linear-gradient(90deg,#5596fe,#97ceff)",
                                  color: "#fff",
                                  border: "none",
                                }}
                                onClick={() => {
                                  const locId =
                                    trip.days?.[0]?.locations?.[0]
                                      ?.locationId ?? null;
                                  setReviewTarget({
                                    locationId: locId,
                                    tripTitle:
                                      trip.title ?? trip.destinationGovernorate,
                                  });
                                  setReviewRating(5);
                                  setReviewText("");
                                  setShowReviewModal(true);
                                }}
                              >
                                Write a Review
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    {completedFiltered.length > 3 && activeFilter !== "ALL" && (
                      <div className="show-more-wrap">
                        <button
                          className="show-more-btn"
                          onClick={() => setShowAllCompleted(!showAllCompleted)}
                        >
                          {showAllCompleted ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* ===== REVIEWS TAB ===== */}
          {activeTab === "Reviews" && (
            <div className="reviews-tab">
              <div className="overview-section">
                <h4>My Reviews</h4>
                <div className="reviews-list">
                  {reviews
                    .slice(0, showAllReviews ? undefined : 2)
                    .map((review) => (
                      <div className="review-card" key={review.id}>
                        <img
                          src={review.image}
                          alt={review.place}
                          className="review-img"
                        />
                        <div className="review-body">
                          <div className="review-header">
                            <div>
                              <h5>{review.place}</h5>
                              <p className="review-date">{review.date}</p>
                              <div className="review-stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <span
                                    key={s}
                                    style={{
                                      color:
                                        s <= review.rating ? "#f5a623" : "#ddd",
                                      fontSize: 18,
                                    }}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div style={{ position: "relative" }}>
                              <button
                                className="trip-more-btn"
                                style={{
                                  position: "static",
                                  background: "#f3f4f6",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(
                                    openMenuId === `rev-${review.id}`
                                      ? null
                                      : `rev-${review.id}`,
                                  );
                                }}
                              >
                                ⋮
                              </button>
                              {openMenuId === `rev-${review.id}` && (
                                <div
                                  className="trip-dropdown"
                                  style={{ right: 0, top: 36 }}
                                >
                                  <button
                                    className="dropdown-item"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditTarget(review);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit Review
                                  </button>
                                  <button
                                    className="dropdown-item delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteTarget(review);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                      <path d="M10 11v6M14 11v6" />
                                      <path d="M9 6V4h6v2" />
                                    </svg>
                                    Delete Review
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="review-text">{review.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
                {reviews.length > 2 && (
                  <div className="show-more-wrap">
                    <button
                      className="show-more-btn"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Confirmation Modal */}
              {deleteTarget && (
                <div
                  className="modal-overlay"
                  onClick={() => setDeleteTarget(null)}
                >
                  <div
                    className="modal-box"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="modal-title">Delete Review?</h3>
                    <p className="modal-desc">
                      Are you sure you want to delete your review for{" "}
                      {deleteTarget.place}? This action cannot be undone.
                    </p>
                    <div className="modal-actions">
                      <button
                        className="modal-cancel-btn"
                        onClick={() => setDeleteTarget(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-delete-btn"
                        onClick={() => setDeleteTarget(null)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Edit Review Modal */}
          {editTarget && (
            <div className="modal-overlay" onClick={() => setEditTarget(null)}>
              <div
                className="modal-box"
                style={{ width: 460 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="modal-title">Edit Review</h3>
                <p className="modal-desc" style={{ marginBottom: 20 }}>
                  Update your experience for this trip.
                </p>
                <div
                  style={{
                    border: "1px solid #eef0f4",
                    borderRadius: 12,
                    padding: "16px",
                    marginBottom: 24,
                    textAlign: "left",
                  }}
                >
                  <h5
                    style={{
                      margin: "0 0 8px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1a1a2e",
                    }}
                  >
                    {editTarget.place}
                  </h5>
                  <div style={{ marginBottom: 10 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          color: s <= editTarget.rating ? "#f5a623" : "#ddd",
                          fontSize: 22,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setEditTarget({ ...editTarget, rating: s })
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    style={{
                      width: "100%",
                      minHeight: 110,
                      border: "none",
                      background: "#f3f4f6",
                      borderRadius: 8,
                      padding: "12px",
                      fontSize: 14,
                      color: "#374151",
                      resize: "vertical",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                    value={editTarget.text}
                    onChange={(e) =>
                      setEditTarget({ ...editTarget, text: e.target.value })
                    }
                  />
                </div>
                <div className="modal-actions">
                  <button
                    className="modal-cancel-btn"
                    onClick={() => setEditTarget(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-delete-btn"
                    style={{
                      background: "linear-gradient(90deg, #5596fe, #97ceff)",
                    }}
                    onClick={() => setEditTarget(null)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== SETTINGS TAB ===== */}
          {activeTab === "Settings" && (
            <div className="settings-tab">
              {/* ===== FAQs View ===== */}
              {activeSetting === "faqs" && (
                <div className="overview-section">
                  <div className="faq-header">
                    <button
                      className="faq-back-btn"
                      onClick={() => {
                        setActiveSetting(null);
                        setFaqSearch("");
                        setOpenFaqId(null);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <div>
                      <h4 style={{ margin: 0 }}>Frequently Asked Questions</h4>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 13,
                          color: "#999",
                        }}
                      >
                        Have questions? We're here to help you make the most of
                        your journey.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Search */}
                  <div className="faq-search-wrap">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      className="faq-search-input"
                      type="text"
                      placeholder="Search for a question..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                    />
                  </div>

                  {/* FAQ Items */}
                  <div className="faq-list">
                    {faqsData
                      .filter((f) =>
                        f.q.toLowerCase().includes(faqSearch.toLowerCase()),
                      )
                      .map((faq, i, arr) => (
                        <div key={i} className="faq-item">
                          <button
                            className="faq-question-btn"
                            onClick={() =>
                              setOpenFaqId(openFaqId === i ? null : i)
                            }
                          >
                            <span>{faq.q}</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#5596fe"
                              strokeWidth="2"
                              style={{
                                transform:
                                  openFaqId === i
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.25s",
                                flexShrink: 0,
                              }}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                          {openFaqId === i && (
                            <p className="faq-answer">{faq.a}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ===== Terms of Service View ===== */}
              {activeSetting === "terms" && (
                <div className="overview-section">
                  <div className="faq-header">
                    <button
                      className="faq-back-btn"
                      onClick={() => setActiveSetting(null)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <h4 style={{ margin: 0 }}>Terms Of Service</h4>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 13,
                          color: "#999",
                        }}
                      >
                        Last Updated: May 2026
                      </p>
                    </div>
                    <button className="terms-download-btn">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </button>
                  </div>

                  {/* Hello banner */}
                  <div className="terms-hello-banner">
                    <p>
                      <span style={{ fontSize: 16 }}>Hello 👋</span>
                      <br />
                      Before you create an account, please read and accept our
                      Terms and Conditions.
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="terms-content">
                    {termsData.map((item, idx) => (
                      <div className="terms-section-row" key={idx}>
                        <div className="terms-dot" />
                        <div className="terms-section-body">
                          <p className="terms-section-title">{item.section}</p>
                          <ul className="terms-points">
                            {item.points.map((point, pi) => (
                              <li
                                key={pi}
                                className="terms-point"
                                style={
                                  item.noteIndex === pi
                                    ? { color: "#5596fe", fontWeight: 500 }
                                    : {}
                                }
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== User Policy View ===== */}
              {activeSetting === "policy" && (
                <div className="overview-section">
                  <div className="faq-header">
                    <button
                      className="faq-back-btn"
                      onClick={() => setActiveSetting(null)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <h4 style={{ margin: 0, flex: 1, textAlign: "center" }}>
                      User Policy
                    </h4>
                    <div style={{ width: 36 }} />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      color: "#999",
                      margin: "4px 0 20px",
                    }}
                  >
                    Last Updated: May 2026
                  </p>
                  <div className="terms-content">
                    {userPolicyData.map((item, idx) => (
                      <div className="terms-section-row" key={idx}>
                        <div className="terms-dot" />
                        <div className="terms-section-body">
                          <p className="terms-section-title">{item.section}</p>
                          <ul className="terms-points">
                            {item.points.map((point, pi) => (
                              <li key={pi} className="terms-point">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!activeSetting && (
                <>
                  {/* Preferences */}
                  <div className="settings-section">
                    <div className="settings-group">
                      <h4 className="stg-title">Preferences</h4>

                      <div className="settings-row-item">
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                          </svg>
                          <div>
                            <p className="settings-item-title">Language</p>
                            <p className="settings-item-desc">
                              Choose your interface language
                            </p>
                          </div>
                        </div>
                        <div className="settings-row-right">
                          <span className="settings-value">English</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#999"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>

                      <div className="settings-divider" />

                      <div className="settings-row-item">
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                          </svg>
                          <div>
                            <p className="settings-item-title">Dark Theme</p>
                            <p className="settings-item-desc">
                              Switch between light and dark themes
                            </p>
                          </div>
                        </div>
                        <div className="settings-toggle off">
                          <div className="settings-toggle-knob" />
                        </div>
                      </div>

                      <div className="settings-divider" />

                      <div className="settings-row-item">
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 01-3.46 0" />
                            <line x1="6" y1="3" x2="6" y2="3" />
                          </svg>
                          <div>
                            <p className="settings-item-title">
                              Pause notifications
                            </p>
                            <p className="settings-item-desc">
                              Temporarily mute all trip alerts
                            </p>
                          </div>
                        </div>
                        <div className="settings-toggle on">
                          <div className="settings-toggle-knob" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account & Security */}
                  <div className="settings-section">
                    <div className="settings-group">
                      <h4 className="stg-title">Account & Security</h4>

                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowChangePasswordModal(true)}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                          <div>
                            <p className="settings-item-title">
                              Change Password
                            </p>
                            <p className="settings-item-desc">
                              Update your password to keep your account secure
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className="settings-divider" />

                      {/* Logout */}
                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLogoutModal(true)}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          <div>
                            <p className="settings-item-title">Log Out</p>
                            <p className="settings-item-desc">
                              Sign out of your account
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className="settings-divider" />

                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowDeleteAccountModal(true)}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#e53935"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                          <div>
                            <p
                              className="settings-item-title"
                              style={{ color: "#e53935" }}
                            >
                              Delete Account
                            </p>
                            <p className="settings-item-desc">
                              Permanently remove your account and data
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Support & About */}
                  <div className="settings-section">
                    <div className="settings-group">
                      <h4 className="stg-title">Support & About</h4>

                      {/* FAQs - navigates to FAQ view */}
                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveSetting("faqs")}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <div>
                            <p className="settings-item-title">FAQs</p>
                            <p className="settings-item-desc">
                              Common questions about MindTrip
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className="settings-divider" />

                      {/* Terms of Service */}
                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveSetting("terms")}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <div>
                            <p className="settings-item-title">
                              Terms of Service
                            </p>
                            <p className="settings-item-desc">
                              Read the rules and guidelines for using our
                              platform
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      <div className="settings-divider" />

                      {/* User Policy */}
                      <div
                        className="settings-row-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveSetting("policy")}
                      >
                        <div className="settings-row-left">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <div>
                            <p className="settings-item-title">User Policy</p>
                            <p className="settings-item-desc">
                              Learn how we handle and protect your data
                            </p>
                          </div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Delete Account Modal */}
              {showDeleteAccountModal && (
                <div
                  className="modal-overlay"
                  onClick={() => setShowDeleteAccountModal(false)}
                >
                  <div
                    className="modal-box"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                    <h3 className="modal-title">Delete Account?</h3>
                    <p className="modal-desc">
                      Are you sure you want to permanently delete your account?
                      This action cannot be undone.
                    </p>
                    <div className="modal-actions">
                      <button
                        className="modal-cancel-btn"
                        onClick={() => setShowDeleteAccountModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-delete-btn"
                        onClick={handleDeleteAccount}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Logout Confirmation Modal */}
              {showLogoutModal && (
                <div
                  className="modal-overlay"
                  onClick={() => setShowLogoutModal(false)}
                >
                  <div
                    className="modal-box"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
                    <h3 className="modal-title">Log Out?</h3>
                    <p className="modal-desc">
                      Are you sure you want to log out of your account?
                    </p>
                    <div className="modal-actions">
                      <button
                        className="modal-cancel-btn"
                        onClick={() => setShowLogoutModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-delete-btn"
                        style={{
                          background: "linear-gradient(90deg,#5596fe,#97ceff)",
                          opacity: logoutLoading ? 0.6 : 1,
                        }}
                        onClick={handleLogout}
                        disabled={logoutLoading}
                      >
                        {logoutLoading ? "Logging out..." : "Log Out"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password Modal */}
              {showChangePasswordModal && (
                <div
                  className="modal-overlay"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setCpError("");
                  }}
                >
                  <div
                    className="modal-box"
                    style={{ width: 420 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="modal-title">Change Password</h3>
                    <p className="modal-desc">
                      Enter your current password and choose a new one.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      {[
                        {
                          ph: "Current Password",
                          val: cpCurrent,
                          set: setCpCurrent,
                        },
                        { ph: "New Password", val: cpNew, set: setCpNew },
                        {
                          ph: "Confirm Password",
                          val: cpConfirm,
                          set: setCpConfirm,
                        },
                      ].map(({ ph, val, set }) => (
                        <div key={ph} style={{ position: "relative" }}>
                          <svg
                            style={{
                              position: "absolute",
                              left: 14,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#aaa"
                            strokeWidth="2"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                          <input
                            type="password"
                            placeholder={ph}
                            value={val}
                            onChange={(e) => set(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "12px 14px 12px 40px",
                              border: "1.5px solid #e8e8e8",
                              borderRadius: 10,
                              fontSize: 14,
                              outline: "none",
                              boxSizing: "border-box",
                              color: "#374151",
                              background: "#fff",
                            }}
                          />
                        </div>
                      ))}
                      {cpError && (
                        <p
                          style={{ color: "#e53935", fontSize: 13, margin: 0 }}
                        >
                          {cpError}
                        </p>
                      )}
                      <p
                        style={{
                          fontSize: 12,
                          color: "#999",
                          textAlign: "left",
                          margin: 0,
                        }}
                      >
                        • At least 8 characters long
                        <br />• Include at least one number or special character
                      </p>
                    </div>
                    <div className="modal-actions">
                      <button
                        className="modal-cancel-btn"
                        onClick={() => {
                          setShowChangePasswordModal(false);
                          setCpError("");
                          setCpCurrent("");
                          setCpNew("");
                          setCpConfirm("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-delete-btn"
                        style={{
                          background: "linear-gradient(90deg,#5596fe,#97ceff)",
                          opacity: cpLoading ? 0.6 : 1,
                        }}
                        onClick={handleChangePassword}
                        disabled={cpLoading}
                      >
                        {cpLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* ===== Edit Profile Full Page ===== */}
      {showEditProfileModal && (
        <div className="ep-page-overlay">
          <div className="ep-page">
            {/* Cover + Avatar */}
            <div className="ep-cover">
              <img src={dahab} alt="cover" className="ep-cover-img" />
            </div>
            <div className="ep-avatar-row">
              <div className="ep-avatar-wrap">
                <img src={clint1} alt="avatar" className="ep-avatar" />
                <button className="ep-avatar-edit-btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="ep-form">
              {/* Fields Grid */}
              <div className="ep-fields-grid">
                <div className="ep-field">
                  <label className="ep-label">Full Name</label>
                  <div
                    className="ep-input-wrap"
                    onClick={(e) =>
                      e.currentTarget.querySelector("input, textarea")?.focus()
                    }
                  >
                    <input
                      className="ep-input"
                      value={editProfileData.fullName}
                      onChange={(e) =>
                        setEditProfileData({
                          ...editProfileData,
                          fullName: e.target.value,
                        })
                      }
                    />
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                </div>

                <div className="ep-field">
                  <label className="ep-label">Email</label>
                  <div
                    className="ep-input-wrap"
                    onClick={(e) =>
                      e.currentTarget.querySelector("input, textarea")?.focus()
                    }
                  >
                    <input
                      className="ep-input"
                      value={editProfileData.email}
                      onChange={(e) =>
                        setEditProfileData({
                          ...editProfileData,
                          email: e.target.value,
                        })
                      }
                    />
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                </div>

                <div className="ep-field">
                  <label className="ep-label">Username</label>
                  <div
                    className="ep-input-wrap"
                    onClick={(e) =>
                      e.currentTarget.querySelector("input, textarea")?.focus()
                    }
                  >
                    <input
                      className="ep-input"
                      value={editProfileData.username}
                      onChange={(e) =>
                        setEditProfileData({
                          ...editProfileData,
                          username: e.target.value,
                        })
                      }
                    />
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                </div>

                <div className="ep-field">
                  <label className="ep-label">Phone Number</label>
                  <div
                    className="ep-input-wrap"
                    onClick={(e) =>
                      e.currentTarget.querySelector("input, textarea")?.focus()
                    }
                  >
                    <input
                      className="ep-input"
                      value={editProfileData.phone}
                      onChange={(e) =>
                        setEditProfileData({
                          ...editProfileData,
                          phone: e.target.value,
                        })
                      }
                    />
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BIO */}
              <div className="ep-field ep-field-full">
                <label className="ep-label">BIO</label>
                <div
                  className="ep-input-wrap ep-textarea-wrap"
                  onClick={(e) =>
                    e.currentTarget.querySelector("input, textarea")?.focus()
                  }
                >
                  <textarea
                    className="ep-input ep-textarea"
                    value={editProfileData.bio}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        bio: e.target.value,
                      })
                    }
                  />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2"
                    style={{ position: "absolute", top: 14, right: 14 }}
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
              </div>

              {/* My Travel Interests */}
              <div className="ep-field ep-field-full">
                <div className="ep-interests-header">
                  <label
                    className="ep-label"
                    style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}
                  >
                    My Travel Interests
                  </label>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5596fe"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div className="interests-wrap" style={{ marginTop: 12 }}>
                  {interests.map((interest, i) => (
                    <span
                      key={i}
                      className={`interest-tag ${editProfileData.interests.includes(interest.label) ? "active" : ""}`}
                      onClick={() => {
                        const current = editProfileData.interests;
                        const updated = current.includes(interest.label)
                          ? current.filter((x) => x !== interest.label)
                          : [...current, interest.label];
                        setEditProfileData({
                          ...editProfileData,
                          interests: updated,
                        });
                      }}
                    >
                      {interest.emoji} {interest.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="ep-actions">
                {updateError && (
                  <div
                    style={{
                      color: "#e74c3c",
                      fontSize: "13px",
                      marginBottom: "12px",
                    }}
                  >
                    {updateError}
                  </div>
                )}
                <button
                  className="ep-save-btn"
                  onClick={handleSaveProfile}
                  disabled={updateLoading}
                  style={{ opacity: updateLoading ? 0.6 : 1 }}
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="ep-cancel-btn"
                  onClick={() => setShowEditProfileModal(false)}
                  disabled={updateLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Profile Saved Success Modal ===== */}
      {showProfileSavedModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProfileSavedModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 340 }}
          >
            <div style={{ fontSize: 44, color: "#22c55e", marginBottom: 12 }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="modal-title">Profile updated successfully!</h3>
            <div className="modal-actions" style={{ marginTop: 8 }}>
              <button
                className="ep-save-btn"
                style={{ width: "100%" }}
                onClick={() => setShowProfileSavedModal(false)}
              >
                Back to profile
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toast.message}
        </div>
      )}

      {/* ═══ INTERESTS EDIT MODAL ═══ */}
      {showInterestsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowInterestsModal(false)}
        >
          <div
            className="modal-box"
            style={{ width: 520, maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title" style={{ marginBottom: 6 }}>
              Edit Travel Interests
            </h3>
            <p className="modal-desc" style={{ marginBottom: 16 }}>
              Select the interests that best match your travel style.
            </p>
            <div className="interests-wrap" style={{ marginBottom: 20 }}>
              {interests.map((item, i) => (
                <span
                  key={i}
                  className={`interest-tag ${tempInterests.includes(item.label) ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setTempInterests((prev) =>
                      prev.includes(item.label)
                        ? prev.filter((x) => x !== item.label)
                        : [...prev, item.label],
                    );
                  }}
                >
                  {item.emoji} {item.label}
                </span>
              ))}
            </div>
            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowInterestsModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-delete-btn"
                style={{
                  background: "linear-gradient(90deg,#5596fe,#97ceff)",
                  opacity: interestsSaving ? 0.6 : 1,
                }}
                onClick={handleSaveInterests}
                disabled={interestsSaving}
              >
                {interestsSaving ? "Saving..." : "Save Interests"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ WRITE A REVIEW MODAL ═══ */}
      {showReviewModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="modal-box"
            style={{ width: 440 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">Write a Review</h3>
            {reviewTarget?.tripTitle && (
              <p className="modal-desc" style={{ marginBottom: 12 }}>
                Trip: <strong>{reviewTarget.tripTitle}</strong>
              </p>
            )}
            {!reviewTarget?.locationId && (
              <p style={{ color: "#e53935", fontSize: 13, marginBottom: 12 }}>
                ⚠️ This trip has no location data attached — review cannot be
                linked to a specific place.
              </p>
            )}
            {/* Star rating */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 28,
                    cursor: "pointer",
                    color: s <= reviewRating ? "#f5a623" : "#ddd",
                  }}
                  onClick={() => setReviewRating(s)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{
                width: "100%",
                minHeight: 110,
                border: "1.5px solid #e8e8e8",
                borderRadius: 10,
                padding: "12px",
                fontSize: 14,
                color: "#374151",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button
                className="modal-cancel-btn"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-delete-btn"
                style={{
                  background: "linear-gradient(90deg,#5596fe,#97ceff)",
                  opacity: reviewSaving || !reviewTarget?.locationId ? 0.6 : 1,
                }}
                onClick={handleSubmitReview}
                disabled={reviewSaving || !reviewTarget?.locationId}
              >
                {reviewSaving ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
