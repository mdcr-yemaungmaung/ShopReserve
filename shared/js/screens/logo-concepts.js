/* ============================================================
   Logo Concepts Gallery Screen
   112 Minimalist Logo Concepts — 27 Restaurant Service Brands
   ============================================================ */

const SVG_PATH_MAP = {
  "LogoPlate": "Extracted_SHL_Logos/SHL_001_SarMal_The_Orbit_Plate_Logo.svg",
  "LogoChatBubble": "Extracted_SHL_Logos/SHL_002_ChateMal_Chat_Feast_Logo.svg",
  "LogoChainC": "Extracted_SHL_Logos/SHL_003_Chein_Link_Dine_Logo.svg",
  "LogoReservationArc": "Extracted_SHL_Logos/SHL_004_SarMal_The_Clockset_Logo.svg",
  "LogoStackedWordmark": "Extracted_SHL_Logos/SHL_005_ChateMal_Editorial_Stacked_Logo.svg",
  "LogoSarMalBowl": "Extracted_SHL_Logos/SHL_006_SarMal_Spiral_Bowl_Logo.svg",
  "LogoCheinFork": "Extracted_SHL_Logos/SHL_007_Chein_Tine_Links_Logo.svg",
  "LogoChateMalArch": "Extracted_SHL_Logos/SHL_008_ChateMal_The_Arch_Door_Logo.svg",
  "LogoSarMalStar": "Extracted_SHL_Logos/SHL_009_SarMal_Hex_Badge_Logo.svg",
  "LogoCheinNodes": "Extracted_SHL_Logos/SHL_010_Chein_Node_Network_Logo.svg",
  "LogoSarMalLeaf": "Extracted_SHL_Logos/SHL_011_SarMal_Leaf_Fork_Logo.svg",
  "LogoCheinRing": "Extracted_SHL_Logos/SHL_012_Chein_Venn_Dine_Logo.svg",
  "LogoChateMalWave": "Extracted_SHL_Logos/SHL_013_ChateMal_Steam_Story_Logo.svg",
  "LogoSarMalMonogram": "Extracted_SHL_Logos/SHL_014_SarMal_The_S_Monogram_Logo.svg",
  "LogoCheinMapPin": "Extracted_SHL_Logos/SHL_015_Chein_Drop_Plate_Logo.svg",
  "LogoChateMalLantern": "Extracted_SHL_Logos/SHL_016_ChateMal_Paper_Lantern_Logo.svg",
  "LogoSarMalRibbon": "Extracted_SHL_Logos/SHL_017_SarMal_Infinite_Hospitality_Logo.svg",
  "LogoCheinFingerprint": "Extracted_SHL_Logos/SHL_018_Chein_Your_Print_Logo.svg",
  "LogoSarMalDiamond": "Extracted_SHL_Logos/SHL_019_SarMal_The_Diamond_X_Logo.svg",
  "LogoChateMalCup": "Extracted_SHL_Logos/SHL_020_ChateMal_Cup_Chat_Logo.svg",
  "LogoCheinCalendar": "Extracted_SHL_Logos/SHL_021_Chein_Calendar_Date_Logo.svg",
  "LogoCheinHourglass": "Extracted_SHL_Logos/SHL_022_Chein_Dining_Glass_Logo.svg",
  "LogoCheinCompass": "Extracted_SHL_Logos/SHL_023_Chein_True_North_Logo.svg",
  "LogoCheinBookmark": "Extracted_SHL_Logos/SHL_024_Chein_Reserved_Logo.svg",
  "LogoCheinPulse": "Extracted_SHL_Logos/SHL_025_Chein_Pulse_Dining_Logo.svg",
  "LogoSarMalSmile": "Extracted_SHL_Logos/SHL_026_SarMal_Joyful_Plate_Logo.svg",
  "LogoSarMalChopsticks": "Extracted_SHL_Logos/SHL_027_SarMal_Chopstick_Swirl_Logo.svg",
  "LogoSarMalBite": "Extracted_SHL_Logos/SHL_028_SarMal_Golden_Bite_Logo.svg",
  "LogoSarMalFlame": "Extracted_SHL_Logos/SHL_029_SarMal_Wok_Flame_Logo.svg",
  "LogoSarMalCrown": "Extracted_SHL_Logos/SHL_030_SarMal_Feast_Crown_Logo.svg",
  "LogoChateMalSocialBite": "Extracted_SHL_Logos/SHL_031_ChateMal_Social_Bite_Logo.svg",
  "LogoChateMalSmilingCloche": "Extracted_SHL_Logos/SHL_032_ChateMal_Smiling_Cloche_Logo.svg",
  "LogoChateMalOrbitingPlate": "Extracted_SHL_Logos/SHL_033_ChateMal_Orbiting_Plate_Logo.svg",
  "LogoChateMalTimeDine": "Extracted_SHL_Logos/SHL_034_ChateMal_Time_Dine_Monogram_Logo.svg",
  "LogoChateMalLocationBowl": "Extracted_SHL_Logos/SHL_035_ChateMal_Location_Bowl_Logo.svg",
  "LogoChateMalDiningMarker": "Extracted_SHL_Logos/SHL_036_ChateMal_The_Dining_Marker_Logo.svg",
  "LogoChateMalTasteDialogue": "Extracted_SHL_Logos/SHL_037_ChateMal_The_Taste_Dialogue_Logo.svg",
  "LogoChateMalGourmet": "Extracted_SHL_Logos/SHL_038_ChateMal_The_ChateMal_Gourmet_Logo.svg",
  "LogoChateMalSeamlessJourney": "Extracted_SHL_Logos/SHL_039_ChateMal_The_Seamless_Journey_Logo.svg",
  "LogoChateMalDiningWhisper": "Extracted_SHL_Logos/SHL_040_ChateMal_The_Dining_Whisper_Logo.svg",
  "LogoChateMalDiningNetwork": "Extracted_SHL_Logos/SHL_041_ChateMal_The_Dining_Network_Logo.svg",
  "LogoChateMalTableSpeech": "Extracted_SHL_Logos/SHL_042_ChateMal_The_Table_Speech_Monogram_Logo.svg",
  "LogoChateMalTastingBadge": "Extracted_SHL_Logos/SHL_043_ChateMal_The_Tasting_Badge_Logo.svg",
  "LogoChateMalSoundwaveFeast": "Extracted_SHL_Logos/SHL_044_ChateMal_The_Soundwave_Feast_Logo.svg",
  "LogoChateMalInfiniteTable": "Extracted_SHL_Logos/SHL_045_ChateMal_The_Infinite_Table_Logo.svg",
  "LogoSarMalCulinaryFlame": "Extracted_SHL_Logos/SHL_046_SarMal_The_Culinary_Flame_Logo.svg",
  "LogoSarMalGoldenBite": "Extracted_SHL_Logos/SHL_047_SarMal_The_Golden_Bite_Monogram_Logo.svg",
  "LogoSarMalChefSmile": "Extracted_SHL_Logos/SHL_048_SarMal_The_Chef_s_Smile_Logo.svg",
  "LogoSarMalOrigamiBowl": "Extracted_SHL_Logos/SHL_049_SarMal_The_Origami_Bowl_Logo.svg",
  "LogoSarMalFlavorBurst": "Extracted_SHL_Logos/SHL_050_SarMal_The_Flavor_Burst_Logo.svg",
  "LogoCheinPrecisionHourglass": "Extracted_SHL_Logos/SHL_051_Chein_The_Precision_Hourglass_Logo.svg",
  "LogoCheinCalendarGrid": "Extracted_SHL_Logos/SHL_052_Chein_The_Calendar_Table_Logo.svg",
  "LogoCheinLockDine": "Extracted_SHL_Logos/SHL_053_Chein_The_Lock_Dine_Monogram_Logo.svg",
  "LogoCheinCompassPlate": "Extracted_SHL_Logos/SHL_054_Chein_The_Compass_Plate_Logo.svg",
  "LogoCheinCountdownBell": "Extracted_SHL_Logos/SHL_055_Chein_The_Countdown_Bell_Logo.svg",
  "LogoCheinModernAbstract": "Extracted_SHL_Logos/SHL_056_Chein_Modern_Pulse_Ring_Logo.svg",
  "LogoCheinModernMascot": "Extracted_SHL_Logos/SHL_057_Chein_Chein_Bot_Concierge_Logo.svg",
  "LogoCheinModernEmblem": "Extracted_SHL_Logos/SHL_058_Chein_Modern_Shield_Reserve_Logo.svg",
  "LogoCheinModernCorporate": "Extracted_SHL_Logos/SHL_059_Chein_Modern_Slot_Grid_Logo.svg",
  "LogoCheinModernWordmark": "Extracted_SHL_Logos/SHL_060_Chein_CHEIN_C_Monogram_Logo.svg",
  "LogoCheinModernVintage": "Extracted_SHL_Logos/SHL_061_Chein_Neo_Vintage_Pocket_Bell_Logo.svg",
  "LogoCheinModernClassic": "Extracted_SHL_Logos/SHL_062_Chein_The_Cloche_Clock_Logo.svg",
  "LogoDineQLightning": "Extracted_SHL_Logos/SHL_063_DineQ_The_Lightning_Q_Logo.svg",
  "LogoDineQSmartQueue": "Extracted_SHL_Logos/SHL_064_DineQ_Smart_Queue_Loop_Logo.svg",
  "LogoDineQBotMascot": "Extracted_SHL_Logos/SHL_065_DineQ_Q_Bot_Speed_Concierge_Logo.svg",
  "LogoDineQFastPassShield": "Extracted_SHL_Logos/SHL_066_DineQ_The_Fast_Pass_Shield_Logo.svg",
  "LogoDineQSpeedlineWordmark": "Extracted_SHL_Logos/SHL_067_DineQ_Speed_Line_Monogram_Logo.svg",
  "LogoDineQVintageBell": "Extracted_SHL_Logos/SHL_068_DineQ_The_Vintage_Queue_Bell_Logo.svg",
  "LogoDineQClassicCloche": "Extracted_SHL_Logos/SHL_069_DineQ_The_Classic_Cloche_Q_Logo.svg",
  "LogoDineQQuantumTable": "Extracted_SHL_Logos/SHL_070_DineQ_Quantum_Table_Logo.svg",
  "LogoDineQQueueArrow": "Extracted_SHL_Logos/SHL_071_DineQ_The_Queue_Arrow_Logo.svg",
  "LogoDineQBirdMascot": "Extracted_SHL_Logos/SHL_072_DineQ_Cheery_Q_Bird_Logo.svg",
  "LogoDineQTicketEmblem": "Extracted_SHL_Logos/SHL_073_DineQ_The_Priority_Ticket_Logo.svg",
  "LogoDineQDQInterlock": "Extracted_SHL_Logos/SHL_074_DineQ_D_Q_Interlock_Monogram_Logo.svg",
  "LogoDineQRetroDiner": "Extracted_SHL_Logos/SHL_075_DineQ_Neo_Retro_Diner_Q_Logo.svg",
  "LogoDineQHourglassClassic": "Extracted_SHL_Logos/SHL_076_DineQ_Minimal_Hourglass_Q_Logo.svg",
  "LogoDineQRadarAbstract": "Extracted_SHL_Logos/SHL_077_DineQ_The_Express_Signal_Logo.svg",
  "LogoDineQPulseCorporate": "Extracted_SHL_Logos/SHL_078_DineQ_The_Queue_Pulse_Logo.svg",
  "LogoDineQBiteMonogram": "Extracted_SHL_Logos/SHL_079_DineQ_Bite_Mark_Q_Monogram_Logo.svg",
  "LogoDineQHatEmblem": "Extracted_SHL_Logos/SHL_080_DineQ_Chef_Q_Hat_Emblem_Logo.svg",
  "LogoDineQOrigamiClassic": "Extracted_SHL_Logos/SHL_081_DineQ_Origami_Q_Bowl_Logo.svg",
  "LogoDineQPandaMascot": "Extracted_SHL_Logos/SHL_082_DineQ_Q_Panda_Fast_Dine_Logo.svg",
  "LogoShokuConcept1": "Extracted_SHL_Logos/SHL_083_Shoku_The_Kanji_Seal_Logo.svg",
  "LogoShokuConcept2": "Extracted_SHL_Logos/SHL_084_Shoku_Zen_Chopsticks_Plate_Logo.svg",
  "LogoShokuConcept3": "Extracted_SHL_Logos/SHL_085_Shoku_Four_Elements_Grid_Logo.svg",
  "LogoShokuConcept4": "Extracted_SHL_Logos/SHL_086_Shoku_Origami_Steam_Logo.svg",
  "LogoShokuConcept5": "Extracted_SHL_Logos/SHL_087_Shoku_Master_s_Knife_Ring_Logo.svg",
  "LogoShokuConcept6": "Extracted_SHL_Logos/SHL_088_Shoku_Eco_Plant_to_Plate_Logo.svg",
  "LogoShokuConcept7": "Extracted_SHL_Logos/SHL_089_Shoku_Color_Flavor_Stack_Logo.svg",
  "LogoShokuConcept8": "Extracted_SHL_Logos/SHL_090_Shoku_Zen_Garden_Ripple_Logo.svg",
  "LogoShokuConcept9": "Extracted_SHL_Logos/SHL_091_Shoku_Noren_Doorway_Gate_Logo.svg",
  "LogoShokuConcept10": "Extracted_SHL_Logos/SHL_092_Shoku_Shoku_Craft_Badge_Logo.svg",
  "LogoYoyakuConcept1": "Extracted_SHL_Logos/SHL_093_Yoyaku_Clock_Seat_Dial_Logo.svg",
  "LogoYoyakuConcept2": "Extracted_SHL_Logos/SHL_094_Yoyaku_Double_Y_Pin_Logo.svg",
  "LogoYoyakuConcept3": "Extracted_SHL_Logos/SHL_095_Yoyaku_Reserved_Ribbon_Tag_Logo.svg",
  "LogoYoyakuConcept4": "Extracted_SHL_Logos/SHL_096_Yoyaku_Zen_Hourglass_Plate_Logo.svg",
  "LogoYoyakuConcept5": "Extracted_SHL_Logos/SHL_097_Yoyaku_Paper_Crane_Arrival_Logo.svg",
  "LogoYoyakuConcept6": "Extracted_SHL_Logos/SHL_098_Yoyaku_Target_Confirmation_Logo.svg",
  "LogoYoyakuConcept7": "Extracted_SHL_Logos/SHL_099_Yoyaku_Ticket_Stub_Monogram_Logo.svg",
  "LogoYoyakuConcept8": "Extracted_SHL_Logos/SHL_100_Yoyaku_Overlapping_Dials_Logo.svg",
  "LogoYoyakuConcept9": "Extracted_SHL_Logos/SHL_101_Yoyaku_Architectural_Tent_Logo.svg",
  "LogoYoyakuConcept10": "Extracted_SHL_Logos/SHL_102_Yoyaku_Y_Spatial_Grid_Logo.svg",
  "LogoKaisekiConcept1": "Extracted_SHL_Logos/SHL_103_Kaiseki_Imperial_Kamon_Crest_Logo.svg",
  "LogoKaisekiConcept2": "Extracted_SHL_Logos/SHL_104_Kaiseki_Multi_Course_Stack_Logo.svg",
  "LogoKaisekiConcept3": "Extracted_SHL_Logos/SHL_105_Kaiseki_Sakura_Plating_Ring_Logo.svg",
  "LogoKaisekiConcept4": "Extracted_SHL_Logos/SHL_106_Kaiseki_Golden_Fan_Banquet_Logo.svg",
  "LogoKaisekiConcept5": "Extracted_SHL_Logos/SHL_107_Kaiseki_Zen_Stone_Balance_Logo.svg",
  "LogoKaisekiConcept6": "Extracted_SHL_Logos/SHL_108_Kaiseki_Omotenashi_Offering_Logo.svg",
  "LogoKaisekiConcept7": "Extracted_SHL_Logos/SHL_109_Kaiseki_Wireframe_Crane_Logo.svg",
  "LogoKaisekiConcept8": "Extracted_SHL_Logos/SHL_110_Kaiseki_Seigaiha_Wave_Logo.svg",
  "LogoKaisekiConcept9": "Extracted_SHL_Logos/SHL_111_Kaiseki_Bamboo_Leaf_Rest_Logo.svg",
  "LogoKaisekiConcept10": "Extracted_SHL_Logos/SHL_112_Kaiseki_Jyubako_Bento_Matrix_Logo.svg",
  "LogoYMM_01": "Extracted_YMM_Logos/YMM_001_Handshake_Plate_Logo.png",
  "LogoYMM_02": "Extracted_YMM_Logos/YMM_002_Mortar_Pestle_Chili_Logo.png",
  "LogoYMM_03": "Extracted_YMM_Logos/YMM_003_Compass_Fork_Logo.png",
  "LogoYMM_04": "Extracted_YMM_Logos/YMM_004_Lotus_Bowl_Logo.png",
  "LogoYMM_05": "Extracted_YMM_Logos/YMM_005_Reserved_Stamp_Logo.png",
  "LogoYMM_06": "Extracted_YMM_Logos/YMM_006_Magnifying_Glass_Star_Logo.png",
  "LogoYMM_07": "Extracted_YMM_Logos/YMM_007_Clock_Search_Utensils_Logo.png",
  "LogoYMM_08": "Extracted_YMM_Logos/YMM_008_Knotted_Thread_Logo.png",
  "LogoYMM_09": "Extracted_YMM_Logos/YMM_009_Stacked_Stones_Logo.png",
  "LogoYMM_10": "Extracted_YMM_Logos/YMM_010_Ferry_Boat_Logo.png",
  "LogoYMM_11": "Extracted_YMM_Logos/YMM_011_Plate_Utensils_Check_Logo.png",
  "LogoYMM_12": "Extracted_YMM_Logos/YMM_012_Gift_Box_Dar_Logo.png",
  "LogoYMM_13": "Extracted_YMM_Logos/YMM_013_Target_Dining_Crosshair_Logo.png",
  "LogoYMM_14": "Extracted_YMM_Logos/YMM_014_Directional_Signpost_Logo.png",
  "LogoYMM_15": "Extracted_YMM_Logos/YMM_015_Heart_Plate_Fork_Q_Logo.png",
  "LogoYMM_16": "Extracted_YMM_Logos/YMM_016_Location_Pin_Plate_Q_Logo.png",
  "LogoYMM_17": "Extracted_YMM_Logos/YMM_017_Calendar_Search_Utensils_Logo.png",
  "LogoYMM_18": "Extracted_YMM_Logos/YMM_018_Yin_Yang_Dish_Utensil_Logo.png",
  "LogoYMM_19": "Extracted_YMM_Logos/YMM_019_Binoculars_Utensils_Logo.png",
  "LogoYMM_20": "Extracted_YMM_Logos/YMM_020_Swirl_Utensils_Plate_Q_Logo.png",
  "LogoYMM_21": "Extracted_YMM_Logos/YMM_021_Camera_Aperture_Utensils_Logo.png",
  "LogoYMM_22": "Extracted_YMM_Logos/YMM_022_Banana_Leaf_Curry_Fork_Logo.png",
  "LogoYMM_23": "Extracted_YMM_Logos/YMM_023_Crossed_Utensils_Q_Plate_Logo.png",
  "LogoYMM_24": "Extracted_YMM_Logos/YMM_024_Karaweik_Royal_Bird_Q_Logo.png",
  "LogoYMM_25": "Extracted_YMM_Logos/YMM_025_Myanmar_Lantern_Fork_Logo.png",
  "LogoYMM_26": "Extracted_YMM_Logos/YMM_026_Checkmark_Q_Plate_Logo.png",
  "LogoYMM_27": "Extracted_YMM_Logos/YMM_027_Pathein_Umbrella_Dining_Logo.png",
  "LogoYMM_28": "Extracted_YMM_Logos/YMM_028_Search_Utensils_Calendar_Logo.png",
  "LogoPZCW_01": "Extracted_PZCW_Logos/PZCW_001_Concept_1_Elegant_Cloche_Q_Logo.png",
  "LogoPZCW_02": "Extracted_PZCW_Logos/PZCW_002_Concept_10_Cloche_Void_Q_Logo.png",
  "LogoPZCW_03": "Extracted_PZCW_Logos/PZCW_003_Concept_2_Monogram_Fork_Dq_Logo.png",
  "LogoPZCW_04": "Extracted_PZCW_Logos/PZCW_004_Concept_3_Service_Bell_Q_Logo.png",
  "LogoPZCW_05": "Extracted_PZCW_Logos/PZCW_005_Concept_4_Reservation_Check_Q_Logo.png",
  "LogoPZCW_06": "Extracted_PZCW_Logos/PZCW_006_Concept_5_Architectural_Dining_Q_Logo.png",
  "LogoPZCW_07": "Extracted_PZCW_Logos/PZCW_007_Concept_6_Negative_Space_Q_Emblem_Logo.png",
  "LogoPZCW_08": "Extracted_PZCW_Logos/PZCW_008_Concept_7_Discovery_Pin_Dq_Logo.png",
  "LogoPZCW_09": "Extracted_PZCW_Logos/PZCW_009_Concept_8_Structural_Table_D_Logo.png",
  "LogoPZCW_10": "Extracted_PZCW_Logos/PZCW_010_Concept_9_Excellence_Spark_Dq_Logo.png",
  "LogoPZCW_11": "Extracted_PZCW_Logos/PZCW_011_Dineq_Concept_1_Logo.png",
  "LogoPZCW_12": "Extracted_PZCW_Logos/PZCW_012_Dineq_Concept_1_Checkmark_Q_1_Logo.png",
  "LogoPZCW_13": "Extracted_PZCW_Logos/PZCW_013_Dineq_Concept_1_Checkmark_Q_2_Logo.png",
  "LogoPZCW_14": "Extracted_PZCW_Logos/PZCW_014_Dineq_Concept_1_Geometric_D_Table_Logo.png",
  "LogoPZCW_15": "Extracted_PZCW_Logos/PZCW_015_Dineq_Concept_1_Precision_Booking_Logo.png",
  "LogoPZCW_16": "Extracted_PZCW_Logos/PZCW_016_Dineq_Concept_10_Logo.png",
  "LogoPZCW_17": "Extracted_PZCW_Logos/PZCW_017_Dineq_Concept_10_Communication_Q_Logo.png",
  "LogoPZCW_18": "Extracted_PZCW_Logos/PZCW_018_Dineq_Concept_10_Furniture_Q_Logo.png",
  "LogoPZCW_19": "Extracted_PZCW_Logos/PZCW_019_Dineq_Concept_10_Structural_Elegance_Logo.png",
  "LogoPZCW_20": "Extracted_PZCW_Logos/PZCW_020_Dineq_Concept_10_Table_Chairs_Q_Logo.png",
  "LogoPZCW_21": "Extracted_PZCW_Logos/PZCW_021_Dineq_Concept_11_Logo.png",
  "LogoPZCW_22": "Extracted_PZCW_Logos/PZCW_022_Dineq_Concept_12_Logo.png",
  "LogoPZCW_23": "Extracted_PZCW_Logos/PZCW_023_Dineq_Concept_13_Logo.png",
  "LogoPZCW_24": "Extracted_PZCW_Logos/PZCW_024_Dineq_Concept_14_Logo.png",
  "LogoPZCW_25": "Extracted_PZCW_Logos/PZCW_025_Dineq_Concept_15_Logo.png",
  "LogoPZCW_26": "Extracted_PZCW_Logos/PZCW_026_Dineq_Concept_16_Logo.png",
  "LogoPZCW_27": "Extracted_PZCW_Logos/PZCW_027_Dineq_Concept_17_Logo.png",
  "LogoPZCW_28": "Extracted_PZCW_Logos/PZCW_028_Dineq_Concept_18_Logo.png",
  "LogoPZCW_29": "Extracted_PZCW_Logos/PZCW_029_Dineq_Concept_19_Logo.png",
  "LogoPZCW_30": "Extracted_PZCW_Logos/PZCW_030_Dineq_Concept_2_Logo.png",
  "LogoPZCW_31": "Extracted_PZCW_Logos/PZCW_031_Dineq_Concept_2_Q_Location_Pin_Logo.png",
  "LogoPZCW_32": "Extracted_PZCW_Logos/PZCW_032_Dineq_Concept_2_Responsive_Service_Logo.png",
  "LogoPZCW_33": "Extracted_PZCW_Logos/PZCW_033_Dineq_Concept_2_Service_Bell_Q_1_Logo.png",
  "LogoPZCW_34": "Extracted_PZCW_Logos/PZCW_034_Dineq_Concept_2_Service_Bell_Q_2_Logo.png",
  "LogoPZCW_35": "Extracted_PZCW_Logos/PZCW_035_Dineq_Concept_20_Logo.png",
  "LogoPZCW_36": "Extracted_PZCW_Logos/PZCW_036_Dineq_Concept_3_Logo.png",
  "LogoPZCW_37": "Extracted_PZCW_Logos/PZCW_037_Dineq_Concept_3_Culinary_Anchor_Logo.png",
  "LogoPZCW_38": "Extracted_PZCW_Logos/PZCW_038_Dineq_Concept_3_Dining_D_Logo.png",
  "LogoPZCW_39": "Extracted_PZCW_Logos/PZCW_039_Dineq_Concept_3_Dq_Plate_Monogram_Logo.png",
  "LogoPZCW_40": "Extracted_PZCW_Logos/PZCW_040_Dineq_Concept_3_Fork_Plate_D_Logo.png",
  "LogoPZCW_41": "Extracted_PZCW_Logos/PZCW_041_Dineq_Concept_4_Logo.png",
  "LogoPZCW_42": "Extracted_PZCW_Logos/PZCW_042_Dineq_Concept_4_Clock_Plate_Logo.png",
  "LogoPZCW_43": "Extracted_PZCW_Logos/PZCW_043_Dineq_Concept_4_Reserved_Space_Logo.png",
  "LogoPZCW_44": "Extracted_PZCW_Logos/PZCW_044_Dineq_Concept_4_Table_Monogram_1_Logo.png",
  "LogoPZCW_45": "Extracted_PZCW_Logos/PZCW_045_Dineq_Concept_4_Table_Monogram_2_Logo.png",
  "LogoPZCW_46": "Extracted_PZCW_Logos/PZCW_046_Dineq_Concept_5_Logo.png",
  "LogoPZCW_47": "Extracted_PZCW_Logos/PZCW_047_Dineq_Concept_5_Checkmark_Void_Q_Logo.png",
  "LogoPZCW_48": "Extracted_PZCW_Logos/PZCW_048_Dineq_Concept_5_Reservation_Bell_Logo.png",
  "LogoPZCW_49": "Extracted_PZCW_Logos/PZCW_049_Dineq_Concept_5_Seamless_Connection_Logo.png",
  "LogoPZCW_50": "Extracted_PZCW_Logos/PZCW_050_Dineq_Concept_5_Smart_Check_Q_Logo.png",
  "LogoPZCW_51": "Extracted_PZCW_Logos/PZCW_051_Dineq_Concept_6_Logo.png",
  "LogoPZCW_52": "Extracted_PZCW_Logos/PZCW_052_Dineq_Concept_6_Bell_Button_D_Logo.png",
  "LogoPZCW_53": "Extracted_PZCW_Logos/PZCW_053_Dineq_Concept_6_Bell_Stem_D_Logo.png",
  "LogoPZCW_54": "Extracted_PZCW_Logos/PZCW_054_Dineq_Concept_6_Calendar_D_Logo.png",
  "LogoPZCW_55": "Extracted_PZCW_Logos/PZCW_055_Dineq_Concept_6_Instant_Reservation_Logo.png",
  "LogoPZCW_56": "Extracted_PZCW_Logos/PZCW_056_Dineq_Concept_7_Chair_Table_Q_Logo.png",
  "LogoPZCW_57": "Extracted_PZCW_Logos/PZCW_057_Dineq_Concept_7_Dining_Discovery_Logo.png",
  "LogoPZCW_58": "Extracted_PZCW_Logos/PZCW_058_Dineq_Concept_7_Interlocking_Dq_Logo.png",
  "LogoPZCW_59": "Extracted_PZCW_Logos/PZCW_059_Dineq_Concept_7_Interlocking_Plates_Logo.png",
  "LogoPZCW_60": "Extracted_PZCW_Logos/PZCW_060_Dineq_Concept_8_Logo.png",
  "LogoPZCW_61": "Extracted_PZCW_Logos/PZCW_061_Dineq_Concept_8_Discovery_Pin_Q_Logo.png",
  "LogoPZCW_62": "Extracted_PZCW_Logos/PZCW_062_Dineq_Concept_8_Discovery_Q_Logo.png",
  "LogoPZCW_63": "Extracted_PZCW_Logos/PZCW_063_Dineq_Concept_8_Fork_Stem_D_Logo.png",
  "LogoPZCW_64": "Extracted_PZCW_Logos/PZCW_064_Dineq_Concept_8_Trusted_Booking_Logo.png",
  "LogoPZCW_65": "Extracted_PZCW_Logos/PZCW_065_Dineq_Concept_9_Logo.png",
  "LogoPZCW_66": "Extracted_PZCW_Logos/PZCW_066_Dineq_Concept_9_Discovery_Search_Plate_Logo.png",
  "LogoPZCW_67": "Extracted_PZCW_Logos/PZCW_067_Dineq_Concept_9_Premium_Excellence_Logo.png",
  "LogoPZCW_68": "Extracted_PZCW_Logos/PZCW_068_Dineq_Concept_9_Premium_Spark_Logo.png",
  "LogoPZCW_69": "Extracted_PZCW_Logos/PZCW_069_Dineq_Concept_9_Premium_Spark_Dq_Logo.png",
  "LogoPZCW_70": "Extracted_PZCW_Logos/PZCW_070_Dineq_Logo_1_Checkmark_Q_Logo.png",
  "LogoPZCW_71": "Extracted_PZCW_Logos/PZCW_071_Dineq_Logo_10_Furniture_Q_Logo.png",
  "LogoPZCW_72": "Extracted_PZCW_Logos/PZCW_072_Dineq_Logo_2_Service_Bell_Q_Logo.png",
  "LogoPZCW_73": "Extracted_PZCW_Logos/PZCW_073_Dineq_Logo_3_Spark_Monogram_Logo.png",
  "LogoPZCW_74": "Extracted_PZCW_Logos/PZCW_074_Dineq_Logo_4_Discovery_Q_Logo.png",
  "LogoPZCW_75": "Extracted_PZCW_Logos/PZCW_075_Dineq_Logo_5_Interlocking_Dq_Logo.png",
  "LogoPZCW_76": "Extracted_PZCW_Logos/PZCW_076_Dineq_Logo_6_Bell_Button_D_Logo.png",
  "LogoPZCW_77": "Extracted_PZCW_Logos/PZCW_077_Dineq_Logo_7_Void_Checkmark_Q_Logo.png",
  "LogoPZCW_78": "Extracted_PZCW_Logos/PZCW_078_Dineq_Logo_8_Table_Monogram_Logo.png",
  "LogoPZCW_79": "Extracted_PZCW_Logos/PZCW_079_Dineq_Logo_9_Fork_Plate_D_Logo.png",
  "LogoPZCW_80": "Extracted_PZCW_Logos/PZCW_080_Dineq_Logo_Concept_1_1_Logo.png",
  "LogoPZCW_81": "Extracted_PZCW_Logos/PZCW_081_Dineq_Logo_Concept_1_2_Logo.png",
  "LogoPZCW_82": "Extracted_PZCW_Logos/PZCW_082_Dineq_Logo_Concept_1_3_Logo.png",
  "LogoPZCW_83": "Extracted_PZCW_Logos/PZCW_083_Dineq_Logo_Concept_10_1_Logo.png",
  "LogoPZCW_84": "Extracted_PZCW_Logos/PZCW_084_Dineq_Logo_Concept_10_2_Logo.png",
  "LogoPZCW_85": "Extracted_PZCW_Logos/PZCW_085_Dineq_Logo_Concept_10_3_Logo.png",
  "LogoPZCW_86": "Extracted_PZCW_Logos/PZCW_086_Dineq_Logo_Concept_2_1_Logo.png",
  "LogoPZCW_87": "Extracted_PZCW_Logos/PZCW_087_Dineq_Logo_Concept_2_2_Logo.png",
  "LogoPZCW_88": "Extracted_PZCW_Logos/PZCW_088_Dineq_Logo_Concept_2_3_Logo.png",
  "LogoPZCW_89": "Extracted_PZCW_Logos/PZCW_089_Dineq_Logo_Concept_3_1_Logo.png",
  "LogoPZCW_90": "Extracted_PZCW_Logos/PZCW_090_Dineq_Logo_Concept_3_2_Logo.png",
  "LogoPZCW_91": "Extracted_PZCW_Logos/PZCW_091_Dineq_Logo_Concept_3_3_Logo.png",
  "LogoPZCW_92": "Extracted_PZCW_Logos/PZCW_092_Dineq_Logo_Concept_4_1_Logo.png",
  "LogoPZCW_93": "Extracted_PZCW_Logos/PZCW_093_Dineq_Logo_Concept_4_2_Logo.png",
  "LogoPZCW_94": "Extracted_PZCW_Logos/PZCW_094_Dineq_Logo_Concept_4_3_Logo.png",
  "LogoPZCW_95": "Extracted_PZCW_Logos/PZCW_095_Dineq_Logo_Concept_5_1_Logo.png",
  "LogoPZCW_96": "Extracted_PZCW_Logos/PZCW_096_Dineq_Logo_Concept_5_2_Logo.png",
  "LogoPZCW_97": "Extracted_PZCW_Logos/PZCW_097_Dineq_Logo_Concept_5_3_Logo.png",
  "LogoPZCW_98": "Extracted_PZCW_Logos/PZCW_098_Dineq_Logo_Concept_6_1_Logo.png",
  "LogoPZCW_99": "Extracted_PZCW_Logos/PZCW_099_Dineq_Logo_Concept_6_2_Logo.png",
  "LogoPZCW_100": "Extracted_PZCW_Logos/PZCW_100_Dineq_Logo_Concept_7_1_Logo.png",
  "LogoPZCW_101": "Extracted_PZCW_Logos/PZCW_101_Dineq_Logo_Concept_7_2_Logo.png",
  "LogoPZCW_102": "Extracted_PZCW_Logos/PZCW_102_Dineq_Logo_Concept_7_3_Logo.png",
  "LogoPZCW_103": "Extracted_PZCW_Logos/PZCW_103_Dineq_Logo_Concept_8_1_Logo.png",
  "LogoPZCW_104": "Extracted_PZCW_Logos/PZCW_104_Dineq_Logo_Concept_8_2_Logo.png",
  "LogoPZCW_105": "Extracted_PZCW_Logos/PZCW_105_Dineq_Logo_Concept_8_3_Logo.png",
  "LogoPZCW_106": "Extracted_PZCW_Logos/PZCW_106_Dineq_Logo_Concept_9_1_Logo.png",
  "LogoPZCW_107": "Extracted_PZCW_Logos/PZCW_107_Dineq_Logo_Concept_9_2_Logo.png",
  "LogoPZCW_108": "Extracted_PZCW_Logos/PZCW_108_Dineq_Logo_Var_1_Logo.png",
  "LogoPZCW_109": "Extracted_PZCW_Logos/PZCW_109_Dineq_Logo_Var_10_Logo.png",
  "LogoPZCW_110": "Extracted_PZCW_Logos/PZCW_110_Dineq_Logo_Var_2_Logo.png",
  "LogoPZCW_111": "Extracted_PZCW_Logos/PZCW_111_Dineq_Logo_Var_3_Logo.png",
  "LogoPZCW_112": "Extracted_PZCW_Logos/PZCW_112_Dineq_Logo_Var_4_Logo.png",
  "LogoPZCW_113": "Extracted_PZCW_Logos/PZCW_113_Dineq_Logo_Var_5_Logo.png",
  "LogoPZCW_114": "Extracted_PZCW_Logos/PZCW_114_Dineq_Logo_Var_6_Logo.png",
  "LogoPZCW_115": "Extracted_PZCW_Logos/PZCW_115_Dineq_Logo_Var_7_Logo.png",
  "LogoPZCW_116": "Extracted_PZCW_Logos/PZCW_116_Dineq_Logo_Var_8_Logo.png",
  "LogoPZCW_117": "Extracted_PZCW_Logos/PZCW_117_Dineq_Logo_Var_9_Logo.png",
  "LogoPZCW_118": "Extracted_PZCW_Logos/PZCW_118_Dineq_Luxury_Concept_1_Logo.png",
  "LogoPZCW_119": "Extracted_PZCW_Logos/PZCW_119_Dineq_Luxury_Concept_10_Logo.png",
  "LogoPZCW_120": "Extracted_PZCW_Logos/PZCW_120_Dineq_Luxury_Concept_2_Logo.png",
  "LogoPZCW_121": "Extracted_PZCW_Logos/PZCW_121_Dineq_Luxury_Concept_3_Logo.png",
  "LogoPZCW_122": "Extracted_PZCW_Logos/PZCW_122_Dineq_Luxury_Concept_4_Logo.png",
  "LogoPZCW_123": "Extracted_PZCW_Logos/PZCW_123_Dineq_Luxury_Concept_5_Logo.png",
  "LogoPZCW_124": "Extracted_PZCW_Logos/PZCW_124_Dineq_Luxury_Concept_6_Logo.png",
  "LogoPZCW_125": "Extracted_PZCW_Logos/PZCW_125_Dineq_Luxury_Concept_7_Logo.png",
  "LogoPZCW_126": "Extracted_PZCW_Logos/PZCW_126_Dineq_Luxury_Concept_8_Logo.png",
  "LogoPZCW_127": "Extracted_PZCW_Logos/PZCW_127_Dineq_Luxury_Concept_9_Logo.png",
  "LogoPZCW_128": "Extracted_PZCW_Logos/PZCW_128_Dineq_Tech_Concept_1_Geometric_Q_Logo.png",
  "LogoPZCW_129": "Extracted_PZCW_Logos/PZCW_129_Dineq_Tech_Concept_2_Interlocking_Dq_Logo.png",
  "LogoPZCW_130": "Extracted_PZCW_Logos/PZCW_130_Dineq_Tech_Concept_3_The_Reserved_Spot_Logo.png",
  "LogoPZCW_131": "Extracted_PZCW_Logos/PZCW_131_Dineq_Tech_Concept_4_Location_Pin_D_Q_Logo.png",
  "LogoPZCW_132": "Extracted_PZCW_Logos/PZCW_132_Dineq_Tech_Concept_5_Signal_Q_Logo.png",
  "LogoPZCW_133": "Extracted_PZCW_Logos/PZCW_133_Monochrome_Logo_Concept_1_Logo.png",
  "LogoPZCW_134": "Extracted_PZCW_Logos/PZCW_134_Monochrome_Logo_Concept_10_Logo.png",
  "LogoPZCW_135": "Extracted_PZCW_Logos/PZCW_135_Monochrome_Logo_Concept_2_Logo.png",
  "LogoPZCW_136": "Extracted_PZCW_Logos/PZCW_136_Monochrome_Logo_Concept_3_Logo.png",
  "LogoPZCW_137": "Extracted_PZCW_Logos/PZCW_137_Monochrome_Logo_Concept_4_Logo.png",
  "LogoPZCW_138": "Extracted_PZCW_Logos/PZCW_138_Monochrome_Logo_Concept_5_Logo.png",
  "LogoPZCW_139": "Extracted_PZCW_Logos/PZCW_139_Monochrome_Logo_Concept_6_Logo.png",
  "LogoPZCW_140": "Extracted_PZCW_Logos/PZCW_140_Monochrome_Logo_Concept_7_Logo.png",
  "LogoPZCW_141": "Extracted_PZCW_Logos/PZCW_141_Monochrome_Logo_Concept_8_Logo.png",
  "LogoPZCW_142": "Extracted_PZCW_Logos/PZCW_142_Monochrome_Logo_Concept_9_Logo.png"
};

const SVG_CACHE = {};
let isSvgPreloading = false;

function ensureSvgMapLoaded(callback) {
  if (Object.keys(SVG_CACHE).length > 0) {
    if (callback) callback();
    return;
  }
  if (isSvgPreloading) return;
  isSvgPreloading = true;

  fetch((typeof Paths !== 'undefined' ? Paths.root : '') + 'shared/data/svg-map.json')
    .then(res => res.json())
    .then(data => {
      Object.assign(SVG_CACHE, data);
      isSvgPreloading = false;
      if (callback) callback();
      
      // Only auto-re-render if the logo-concepts screen is currently active
      const currentHash = window.location.hash || '#/';
      if (currentHash.includes('/logo-concepts') && window.ScreenLogoConcepts && typeof window.ScreenLogoConcepts.render === 'function') {
        window.ScreenLogoConcepts.render();
      }
    })
    .catch(err => {
      console.warn('svg-map.json preload error:', err);
      isSvgPreloading = false;
    });
}

// Initial fetch attempt on script load
ensureSvgMapLoaded();

const LOCAL_STORAGE_CACHE_KEY = 'ez_uploaded_logos_cache';

function getLocalUploadedCache() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalUploadedCache(newConcept, fileData) {
  try {
    const cache = getLocalUploadedCache();
    const existingIndex = cache.findIndex(item => item && item.concept && item.concept.id === newConcept.id);
    const cacheItem = {
      concept: newConcept,
      fileData: fileData
    };
    if (existingIndex >= 0) {
      cache[existingIndex] = cacheItem;
    } else {
      cache.unshift(cacheItem);
    }
    localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to save uploaded logo to localStorage cache:', e);
  }
}

// ─── Deleted Logos: Source of Truth is GitHub (deleted-logos.json) ───────────
// localStorage is intentionally CLEARED on load so locally-deleted logos
// reappear for users who deleted them before GitHub sync was working.
// Only logos confirmed in deleted-logos.json on GitHub will be hidden.
const LOCAL_DELETED_LOGOS_KEY = 'ez_deleted_logos_cache';
const REMOTE_DELETED_LOGOS_PATH = 'deleted-logos.json';
const GITHUB_OWNER = 'mdcrsoehtetlin';
const GITHUB_REPO = 'Booking-Prototype';
const GITHUB_BRANCH = 'main';
let remoteDeletedLogos = [];
let remoteDeletedLogosLoaded = false;
let remoteDeletedLogosPromise = null;
let _deletedPollingTimer = null;

// Clear stale localStorage deleted cache so everyone sees the same logos.
// The authoritative list will be fetched from GitHub below.
try { localStorage.removeItem(LOCAL_DELETED_LOGOS_KEY); } catch (_e) {}

async function loadRemoteDeletedLogos() {
  try {
    let data = null;

    // PRIMARY: GitHub Contents API — always returns the current committed version,
    // no CDN caching. Works for public repos without a token.
    // Note: ?t= cache-busting does NOT work on raw.githubusercontent.com (CDN ignores it),
    // so we prefer the API endpoint which is always up-to-date.
    try {
      const apiHeaders = { 'Accept': 'application/vnd.github.v3+json' };
      const storedToken = localStorage.getItem('ez_github_token');
      if (storedToken) apiHeaders['Authorization'] = `Bearer ${storedToken}`;
      const apiRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${REMOTE_DELETED_LOGOS_PATH}?ref=${GITHUB_BRANCH}`,
        { headers: apiHeaders }
      );
      if (apiRes.ok) {
        const fileInfo = await apiRes.json();
        if (fileInfo.content) {
          data = JSON.parse(
            decodeURIComponent(escape(atob(fileInfo.content.replace(/\n/g, ''))))
          );
        }
      }
    } catch (_e) {}

    // FALLBACK: raw.githubusercontent.com — may be cached up to ~5 min by CDN,
    // but works without auth and is a useful safety net.
    if (!data) {
      try {
        const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${REMOTE_DELETED_LOGOS_PATH}`;
        const res = await fetch(rawUrl);
        if (res.ok) data = await res.json();
      } catch (_e) {}
    }

    if (Array.isArray(data)) {
      const prevJson = JSON.stringify(remoteDeletedLogos);
      const newJson = JSON.stringify(data);
      remoteDeletedLogos = data;
      // Only re-render if deleted logos list changed AND the logo-concepts screen is currently active
      const currentHash = window.location.hash || '#/';
      if (prevJson !== newJson && currentHash.includes('/logo-concepts') && window.ScreenLogoConcepts && typeof window.ScreenLogoConcepts.render === 'function') {
        window.ScreenLogoConcepts.render();
      }
    }
  } catch (_e) {}
  remoteDeletedLogosLoaded = true;
}

async function ensureRemoteDeletedLogosLoaded() {
  if (remoteDeletedLogosLoaded) return;
  if (remoteDeletedLogosPromise) {
    await remoteDeletedLogosPromise;
    return;
  }
  remoteDeletedLogosPromise = loadRemoteDeletedLogos();
  await remoteDeletedLogosPromise;
}

// Poll deleted-logos.json every 30 seconds so all open browsers sync within 30s of a deletion.
function startDeletedLogosPolling() {
  if (_deletedPollingTimer) return; // already polling
  _deletedPollingTimer = setInterval(async () => {
    await loadRemoteDeletedLogos();
  }, 30000);
}

function isDeletedConcept(id, logoFn, fileName) {
  // Source of truth: remoteDeletedLogos only (localStorage is cleared on startup)
  const allDeleted = remoteDeletedLogos;
  if (!allDeleted || allDeleted.length === 0) return false;

  const idStr = String(id || '').toLowerCase().trim();
  const fnStr = String(logoFn || '').toLowerCase().trim();
  const fileStr = String(fileName || '').toLowerCase().trim();
  const svgPathStr = String(SVG_PATH_MAP[logoFn] || '').toLowerCase().trim();
  const svgFileNameStr = svgPathStr ? svgPathStr.split('/').pop() : '';

  // Extract creator and numeric value for target concept
  let creator = '';
  if (idStr.includes('-')) creator = idStr.split('-')[0];
  else if (fnStr.startsWith('logo')) {
    const match = fnStr.match(/^logo([a-z]+)_/);
    if (match) creator = match[1];
  }
  if (!creator && svgFileNameStr) {
    const match = svgFileNameStr.match(/^([a-z]+)[_-]/);
    if (match) creator = match[1];
  }

  const numMatch = (idStr + ' ' + fnStr + ' ' + fileStr + ' ' + svgFileNameStr).match(/\d+/);
  const targetNumInt = numMatch ? parseInt(numMatch[0], 10) : null;

  return allDeleted.some(del => {
    const d = String(del).toLowerCase().trim();
    if (!d) return false;

    // 1. Direct exact matches
    if (idStr && idStr === d) return true;
    if (fnStr && fnStr === d) return true;
    if (fileStr && fileStr === d) return true;
    if (svgPathStr && svgPathStr === d) return true;
    if (svgFileNameStr && svgFileNameStr === d) return true;
    if (fileStr && fileStr.includes(d) && d.length > 2) return true;
    if (svgFileNameStr && svgFileNameStr.includes(d) && d.length > 2) return true;

    // 2. Creator + Number padding-agnostic match
    if (targetNumInt !== null) {
      const delNumMatch = d.match(/\d+/);
      if (delNumMatch) {
        const delNumInt = parseInt(delNumMatch[0], 10);
        if (delNumInt === targetNumInt) {
          // Parse creator from deletion key
          let delCreator = '';
          if (d.includes('-')) delCreator = d.split('-')[0];
          else if (d.includes('_')) delCreator = d.split('_')[0];
          else if (d.startsWith('logo')) {
            const m = d.match(/^logo([a-z]+)_/);
            if (m) delCreator = m[1];
          }

          // Strip 'logo' prefix if present
          if (delCreator.startsWith('logo')) delCreator = delCreator.substring(4);
          let targetCreator = (creator || '').startsWith('logo') ? creator.substring(4) : creator;

          // Strict matching: if delCreator is specified, it MUST match target creator!
          if (delCreator && targetCreator) {
            if (delCreator.toLowerCase() === targetCreator.toLowerCase()) return true;
          }
        }
      }
    }

    return false;
  });
}
function getCreator(c) {
  if (!c) return 'SHL';
  if (c.creator) return c.creator;
  if (c.id && typeof c.id === 'string' && c.id.includes('-')) return c.id.split('-')[0];
  if (c.logoFn && c.logoFn.startsWith('Logo')) {
    const match = c.logoFn.match(/^Logo([A-Z]+)_/);
    if (match) return match[1];
  }
  return 'SHL';
}

function getConceptNumber(c) {
  if (!c) return '';
  if (c.id && typeof c.id === 'string' && c.id.includes('-')) return c.id.split('-')[1];
  if (c.logoFn && c.logoFn.match(/_(\d+)$/)) return c.logoFn.match(/_(\d+)$/)[1];
  return String(c.id).replace(/\D/g, '');
}

// markLogoAsDeleted: only updates remoteDeletedLogos in-memory.
// Actual persistence is done by the server (deleted-logos.json) or client token fallback.
function markLogoAsDeleted(concept) {
  if (!concept) return;
  const creatorKey = getCreator(concept);
  const num = getConceptNumber(concept);
  const paddedNum = num ? String(num).padStart(3, '0') : '';
  const rawId = String(concept.id || '');
  const svgPath = SVG_PATH_MAP[concept.logoFn] || '';
  const svgFileName = svgPath ? svgPath.split('/').pop() : '';

  const keysToAdd = [
    rawId.includes('-') ? rawId : `${creatorKey}-${rawId}`,
    String(concept.logoFn || ''),
    concept.fileName || '',
    concept.localPath || '',
    svgPath,
    svgFileName,
    num ? `${creatorKey}-${num}` : '',
    paddedNum ? `${creatorKey}-${paddedNum}` : '',
    num ? `${creatorKey}_${num}` : '',
    paddedNum ? `${creatorKey}_${paddedNum}` : '',
    num ? `logo${creatorKey.toLowerCase()}_${num}` : '',
    paddedNum ? `logo${creatorKey.toLowerCase()}_${paddedNum}` : ''
  ].filter(Boolean);

  keysToAdd.forEach(key => {
    const k = String(key).toLowerCase().trim();
    if (k && !remoteDeletedLogos.includes(k)) {
      remoteDeletedLogos.push(k);
    }
  });

  return keysToAdd; // return so the caller can pass them to the API
}

function loadFromLocalUploadedCache() {
  if (typeof CONCEPTS === 'undefined' || !Array.isArray(CONCEPTS)) return;
  const cache = getLocalUploadedCache();
  const existingIds = new Set(CONCEPTS.map(c => c.id));
  cache.forEach(item => {
    if (item && item.concept && item.concept.id) {
      if (isDeletedConcept(item.concept.id, item.concept.logoFn, item.concept.fileName)) {
        return;
      }
      if (!item.concept.appName || item.concept.appName === 'General') {
        item.concept.appName = 'DineQ';
      }
      if (!existingIds.has(item.concept.id)) {
        CONCEPTS.unshift(item.concept);
        existingIds.add(item.concept.id);
        if (item.fileData && item.concept.logoFn) {
          SVG_PATH_MAP[item.concept.logoFn] = item.fileData;
        }
      }
    }
  });
  CONCEPTS.forEach(c => {
    if (c && (!c.appName || c.appName === 'General')) {
      c.appName = 'DineQ';
    }
  });
}

let uploadedLogosLoaded = false;
let isFetchingUploadedLogos = false;
const UPLOADED_CREATOR_FOLDERS = {
  CT: 'Extracted_CT_Logos',
  PZCW: 'Extracted_PZCW_Logos',
  SHL: 'Extracted_SHL_Logos',
  YMM: 'Extracted_YMM_Logos'
};
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/mdcrsoehtetlin/Booking-Prototype/main';

const SVG_FALLBACK_MAP = {};

remoteDeletedLogosPromise = loadRemoteDeletedLogos();
startDeletedLogosPolling();

async function loadUploadedLogosFromGitHub() {
  if (uploadedLogosLoaded || isFetchingUploadedLogos) return;
  uploadedLogosLoaded = true;
  isFetchingUploadedLogos = true;

  loadFromLocalUploadedCache();

  const existingFileNames = new Set(
    Object.values(SVG_PATH_MAP).filter(p => typeof p === 'string').map(p => p.split('/').pop().toLowerCase())
  );

  let folderData = null;
  // Track which creator folders returned a valid response (even if empty).
  // This lets us distinguish a network failure from a folder that is genuinely empty.
  const successfullyContactedCreators = new Set();

  try {
    const apiRes = await fetch('/api/list-logos');
    if (apiRes.ok) {
      const apiJson = await apiRes.json();
      if (apiJson.success) {
        folderData = apiJson.folders;
        // Every creator key returned by the API is considered successfully contacted
        for (const key of Object.keys(folderData)) {
          successfullyContactedCreators.add(key);
        }
      }
    }
  } catch (e) {
    console.warn('/api/list-logos not available, falling back to local dir & direct GitHub API');
  }

  if (!folderData) {
    const owner = 'mdcrsoehtetlin';
    const repo = 'Booking-Prototype';
    const branch = 'main';
    const token = localStorage.getItem('ez_github_token') || '';

    folderData = {};
    for (const [creatorKey, folder] of Object.entries(UPLOADED_CREATOR_FOLDERS)) {
      folderData[creatorKey] = [];

      // 1. Try local directory index fetch first (works on npx serve / local dev server after git pull)
      let localDirSucceeded = false;
      try {
        const localDirRes = await fetch(`./${folder}/`);
        if (localDirRes.ok) {
          localDirSucceeded = true;
          const htmlText = await localDirRes.text();
          const matches = htmlText.match(/href=["']?([^"' >]+\.(?:png|jpg|jpeg|svg))["']?/gi);
          if (matches) {
            const fileNames = new Set();
            matches.forEach(m => {
              let cleanName = m.replace(/^href=["']?/, '').replace(/["']?$/, '');
              cleanName = cleanName.replace(/\\/g, '/').split('/').pop();
              cleanName = decodeURIComponent(cleanName).trim();
              if (cleanName && cleanName.includes('_Logo.')) {
                fileNames.add(cleanName);
              }
            });
            if (fileNames.size > 0) {
              folderData[creatorKey] = Array.from(fileNames).map(name => ({
                name,
                url: `./${folder}/${name}`,
                download_url: `${GITHUB_RAW_BASE}/${folder}/${name}`
              }));
            }
          }
          // Mark as contacted even if directory was empty (no matching files)
          successfullyContactedCreators.add(creatorKey);
        }
      } catch (e) {
        // Ignore local dir fetch error
      }

      // 2. Fallback to GitHub API if local dir didn't succeed
      if (!localDirSucceeded) {
        try {
          const headers = { 'Accept': 'application/vnd.github.v3+json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${folder}?ref=${branch}`, { headers });
          if (res.ok) {
            const items = await res.json();
            if (Array.isArray(items)) {
              folderData[creatorKey] = items.filter(i => i.type === 'file').map(i => ({ name: i.name, url: i.url, download_url: i.download_url }));
            }
            // Mark as contacted only if we got a valid 200 response
            successfullyContactedCreators.add(creatorKey);
          }
        } catch (e) {
          folderData[creatorKey] = [];
          // Don't add to successfullyContactedCreators — network/API error means we don't know the real state
        }
      }
    }
  }

  const knownBrandsList = ['SarMal', 'ChateMal', 'Chein', 'DineQ', 'Shoku', 'Yoyaku', 'Kaiseki', 'Taberu', 'We Kanpai', 'DineReserve', 'TableHop', 'ClickToTable', 'TheVelvetTable', 'TasteTime', 'Fork&File', 'PlateLog', 'YumSpot', 'NayYar', 'SaBweh', 'BookSar', 'DineFlow', 'ReserveHub', 'TableFlow', 'DineSuite', 'RestaurantOS'];

  const filesToProcess = [];
  for (const [creatorKey, files] of Object.entries(folderData)) {
    for (const file of files) {
      const name = file.name;
      const ext = name.split('.').pop().toLowerCase();
      if (!['png', 'jpg', 'jpeg', 'svg'].includes(ext)) continue;

      const match = name.match(new RegExp(`^${creatorKey}[_-](\\d+)[_-](.+?)_Logo\\.${ext}$`, 'i'));
      if (!match) continue;

      const num = match[1];
      const logoFn = `Logo${creatorKey}_${num}`;
      const id = `${creatorKey}-${num}`;
      if (isDeletedConcept(id, logoFn, name) || isDeletedConcept(num, logoFn, name)) continue;

      if (existingFileNames.has(name.toLowerCase())) continue;

      filesToProcess.push({ creatorKey, file, num: match[1], restName: match[2], ext });
    }
  }

  // Only skip entirely if we have no new files AND no creator could be contacted
  // (meaning a total network failure). If some creators were contacted, we still
  // need to run the stale cleanup below.
  if (filesToProcess.length === 0 && successfullyContactedCreators.size === 0) return;

  const results = await Promise.all(filesToProcess.map(async ({ creatorKey, file, num, restName, ext }) => {
    const name = file.name;
    const logoFn = `Logo${creatorKey}_${num}`;
    const id = `${creatorKey}-${num}`;
    const folder = UPLOADED_CREATOR_FOLDERS[creatorKey];
    const filePath = `${folder}/${name}`;

    let appName = 'SarMal';
    let conceptName = restName.replace(/_/g, ' ');

    const parts = restName.split('_');
    const firstPart = parts[0];
    const matchedBrand = knownBrandsList.find(b => b.toLowerCase() === firstPart.toLowerCase());

    if (matchedBrand) {
      appName = matchedBrand;
      conceptName = parts.slice(1).join(' ') || matchedBrand;
    } else {
      appName = inferAppName(conceptName);
    }

    const localPath = `${folder}/${name}`;
    const remoteFallback = file.download_url || `${GITHUB_RAW_BASE}/${filePath}`;

    return {
      id,
      name: conceptName,
      appName,
      tagline: `${creatorKey} uploaded concept`,
      logoFn,
      accentColor: '#2563EB',
      recommended: false,
      isTopPick: false,
      recommendationReason: '',
      visual: `Uploaded logo from ${folder}/${name}`,
      rationale: 'Auto-discovered from repository.',
      typography: '',
      prompt: '',
      palette: [],
      creator: creatorKey,
      style: 'Uploaded',
      localPath,
      remoteFallback,
      fileName: name
    };
  }));

  let hasNew = false;

  // ── Stale cache cleanup ──────────────────────────────────────────────────────
  // Remove uploaded concepts from CONCEPTS + ez_uploaded_logos_cache whose files
  // are no longer on GitHub. Runs even if no NEW files were found, so deleted
  // logos are always cleaned up on page load.
  //
  // SAFETY GUARD: Only remove cache entries for creator folders that were
  // successfully scanned (returned at least 1 file). If a folder scan failed
  // (network error returned empty array), we keep its entries to avoid
  // falsely removing valid logos.
  // successfullyScannedCreators: folders we successfully contacted (even if they returned 0 files).
  // This is the correct set to use for cleanup — a creator with 0 files means
  // "folder is empty", not "scan failed".
  const successfullyScannedCreators = successfullyContactedCreators;

  const allGitHubFileNames = new Set();
  for (const [creator, files] of Object.entries(folderData)) {
    if (successfullyScannedCreators.has(creator)) {
      files.forEach(f => allGitHubFileNames.add(f.name.toLowerCase()));
    }
  }

  if (successfullyScannedCreators.size > 0) {
    let cacheChanged = false;
    let uploadedCacheRaw = getLocalUploadedCache();
    uploadedCacheRaw = uploadedCacheRaw.filter(item => {
      if (!item || !item.concept || !item.concept.fileName) return true;
      const itemCreator = getCreator(item.concept);
      // Only apply cleanup for folders we successfully scanned
      if (!successfullyScannedCreators.has(itemCreator)) return true;
      if (!allGitHubFileNames.has(item.concept.fileName.toLowerCase())) {
        // File gone from GitHub — add its ID to the in-memory deleted list
        const idKey = String(item.concept.id).toLowerCase().trim();
        if (idKey && !remoteDeletedLogos.includes(idKey)) {
          remoteDeletedLogos.push(idKey);
        }
        cacheChanged = true;
        return false; // remove from cache
      }
      return true;
    });
    if (cacheChanged) {
      try { localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(uploadedCacheRaw)); } catch (_e) {}
    }

    // Remove stale uploaded concepts from CONCEPTS in-memory
    CONCEPTS = CONCEPTS.filter(c => {
      if (!c) return false;

      // Handle dynamically discovered (Uploaded) concepts
      if (c.style === 'Uploaded') {
        if (!c.fileName || !c.creator) return true;
        if (!successfullyScannedCreators.has(c.creator)) return true; // don't remove if folder not scanned
        return allGitHubFileNames.has(c.fileName.toLowerCase());
      }

      // Handle hardcoded CONCEPTS whose SVG_PATH_MAP file lives in an Extracted_* folder.
      // If the file is no longer on GitHub, remove the concept and clean up its map entry.
      if (c.logoFn && SVG_PATH_MAP[c.logoFn]) {
        const svgPath = SVG_PATH_MAP[c.logoFn];
        const isExtractedPath = Object.values(UPLOADED_CREATOR_FOLDERS).some(folder =>
          svgPath.startsWith(folder + '/')
        );
        if (isExtractedPath) {
          const svgFileName = svgPath.split('/').pop();
          const folderPrefix = svgPath.split('/')[0];
          // Determine which creator this path belongs to
          const pathCreator = Object.entries(UPLOADED_CREATOR_FOLDERS).find(([, f]) => f === folderPrefix);
          if (pathCreator) {
            const [creatorKey] = pathCreator;
            if (!successfullyScannedCreators.has(creatorKey)) return true; // folder not scanned, keep it
            if (!allGitHubFileNames.has(svgFileName.toLowerCase())) {
              // File is gone from GitHub — clean up map entry and remove concept
              delete SVG_PATH_MAP[c.logoFn];
              delete SVG_FALLBACK_MAP[c.logoFn];
              hasNew = true;
              return false;
            }
          }
        }
      }

      return true;
    });

    // Trigger a render if stale logos were removed, so they vanish immediately.
    if (cacheChanged) hasNew = true;
  }
  // ── End stale cache cleanup ─────────────────────────────────────────────────

  if (filesToProcess.length > 0) {
    results.forEach(res => {
      if (!res) return;
      if (!res.appName || res.appName === 'General') res.appName = 'DineQ';
      SVG_PATH_MAP[res.logoFn] = res.localPath;
      SVG_FALLBACK_MAP[res.logoFn] = res.remoteFallback;
      existingFileNames.add(res.fileName.toLowerCase());
      
      const idx = CONCEPTS.findIndex(c => c.id === res.id);
      if (idx >= 0) {
        CONCEPTS[idx].appName = res.appName;
        CONCEPTS[idx].name = res.name;
      } else {
        CONCEPTS.unshift(res);
        hasNew = true;
      }
    });
  }

  if (hasNew && window.ScreenLogoConcepts && typeof window.ScreenLogoConcepts.render === 'function') {
    // Only auto-render if the logo-concepts screen is currently active
    const currentHash = window.location.hash || '#/';
    if (currentHash.includes('/logo-concepts')) {
      window.ScreenLogoConcepts.render();
    }
  }
}

function getSvgImage(key) {
  const path = SVG_PATH_MAP[key];
  const fallback = SVG_FALLBACK_MAP[key];
  if (path && (path.startsWith('data:') || path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.svg'))) {
    // On error: try fallback first, then hide the image entirely so no broken placeholder appears
    let onerrorJs;
    if (fallback) {
      onerrorJs = `this.onerror=function(){this.style.display='none';};this.src='${fallback}';`;
    } else {
      onerrorJs = `this.style.display='none';`;
    }
    return `<img src="${path}" onerror="${onerrorJs}" alt="${key}" style="width:100%;height:100%;object-fit:contain;pointer-events:none;" />`;
  }
  if (SVG_CACHE[key]) {
    return SVG_CACHE[key];
  }
  return `<div data-svg-key="${key}" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"></div>`;
}

const SVG_MAP = new Proxy({}, {
  get(target, prop) {
    return getSvgImage(prop);
  }
});


let CONCEPTS=[{"id": "01", "name": "The Orbit Plate", "appName": "SarMal", "tagline": "A plate, a clock, a reservation — unified.", "logoFn": "LogoPlate", "accentColor": "#FF6B35", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ SarMal အတွက် အကောင်းဆုံး ရွေးချယ်မှု (Top Pick) — နာရီနှင့် ပန်းကန်ပြား ပေါင်းစပ်ထားသော စက်ဝိုင်းဒီဇိုင်း ဖြစ်ပြီး အက်ပ်အိုင်ကွန်အဖြစ် သုံးရန် အလွန်ထင်ရှား၍ အဆင့်အတန်း မြင့်မားပါသည်။", "visual": "ဒီဇိုင်း၏ ဗဟိုတွင် စားသောက်ဆိုင် ပန်းကန်ပြားကို ကိုယ်စားပြုသော ပြည့်ဝသည့် စက်ဝိုင်းပုံ ပါရှိပါသည်။ စက်ဝိုင်း၏ အရပ်လေးမျက်နှာတွင် နာရီလက်တံ သင်္ကေတ တိုတိုလေးများ ပါရှိသဖြင့် အချိန်နှင့် ဘိုကင်တင်ခြင်းကို ချက်ချင်း ဖော်ပြနေပါသည်။ ပန်းကန်ပြား အလယ်တွင် ဇွန်းနှင့် ခက်ရင်း silhouettes များဖြင့် 'S' ပုံစံ အနုတ်လက္ခဏာ ကွက်လပ် (negative space) ကို ဖန်တီးထားပါသည်။", "rationale": "စက်ဝိုင်းပုံစံများသည် 'ပြည့်စုံမှု' နှင့် 'ယုံကြည်စိတ်ချရမှု' ကို ဆွဲဆောင်မှုရှိစွာ ဖော်ပြနိုင်သဖြင့် သုံးစွဲသူများ အမြဲထိတွေ့နေမည့် app တစ်ခုအတွက် အထူးသင့်လျော်ပါသည်။ နာရီနှင့် ပန်းကန်ပြား ပေါင်းစပ်ပုံစံသည် အချိန်ဘိုကင်ယူခြင်းနှင့် အစားအသောက် သဘောတရားကို သင်္ကေတတစ်ခုတည်းဖြင့် ဖော်ပြပေးပါသည်။ 'SarMal' ဟူသော အမည်၏ ဝိုင်းစက်သောအသံထွက်နှင့် အပြိုင် စက်ဝိုင်းဒီဇိုင်းက Brand Identity ကို ပိုမိုခိုင်မာစေပါသည်။ 32x32px အရွယ်အစားအထိ အလွန်ထင်ရှားပေါ်လွင်ပါသည်။", "typography": "", "prompt": "", "palette": [], "creator": "SHL"}, {"id": "02", "name": "Chat & Feast", "appName": "ChateMal", "tagline": "Conversation. Cuisine. One mark.", "logoFn": "LogoChatBubble", "accentColor": "#2563EB", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အထူးညွှန်းဆိုချက် — Chat Bubble ၏ အလယ်တွင် C နှင့် M ဇွန်းခက်ရင်း လိုင်းများကို ပါးနပ်စွာ ပေါင်းစပ်ထားသဖြင့် သုံးစွဲသူများ သတိပြုမိလွယ်ပါသည်။", "visual": "စကားပြော စက္ကူပူပေါင်း (Chat Bubble) ၏ silhouette အတွင်း၌ စကားလုံး C နှင့် M ကို ကိုယ်စားပြုသော ခက်ရင်းနှင့် ဓားပုံစံ လိုင်းဆွဲပုံများ ပါရှိပါသည်။ စကားပြောအမြီးပိုင်းသည် ဘယ်ဘက်အောက်သို့ ဦးတည်နေပြီး အလယ်တွင် Coral Pink ရောင် လှိုင်းပုံဆက်ကြောင်းလိုင်းက သုံးစွဲသူနှင့် စားသောက်ဆိုင်များကို ချိတ်ဆက်ပေးသည့် ပုံရိပ်ကို ဖော်ပြထားပါသည်။", "rationale": "\"ChateMal\" ဟူသော အမည်သည် Chat (စကားပြောခြင်း) နှင့် Meal (အစားအစာ) တို့ကို တွဲစပ်ထားခြင်းဖြစ်၍ Chat Bubble ပုံစံသည် အမည်၏ အဓိပ္ပာယ်ကို တိုက်ရိုက်ဖော်ပြပါသည်။ ပထမကြည့်လျှင် Chat Bubble ဖြစ်ပြီး သေချာကြည့်ပါက အစားအသောက် ဇွန်းခက်ရင်း ပုံစံဖြစ်သဖြင့် နှစ်ထပ်ကွမ်း အဓိပ္ပာယ်ဖော်ဆောင်မှုက သုံးစွဲသူများကို စိတ်ဝင်စားစေပါသည်။ Electric Blue နှင့် Coral Pink ကာလာ ပေါင်းစပ်မှုသည် လူငယ်လူလတ်ပိုင်း သုံးစွဲသူများကို ဆွဲဆောင်မှုရှိစေပါသည်။", "typography": "Rounded Geometric Sans — Plus Jakarta Sans or Manrope Bold. Tight tracking at −0.02em for the wordmark. Pair with Regular weight for body copy.", "prompt": "Minimalist tech-forward logo icon for a food booking app called \"ChateMal\". A clean rounded speech bubble silhouette containing fork and knife elements forming the letters C and M. A thin wavy connector line in coral pink runs through the interior. Electric blue #2563EB strokes on light sky background #EEF5FF, coral pink #E11D6A accent. Flat 2D vector, zero gradients, zero shadows. 1024×1024 app icon canvas with rounded square mask. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#2563EB", "name": "Electric Azure", "role": "Primary brand"}, {"hex": "#E11D6A", "name": "Coral Flame", "role": "Accent / highlight"}, {"hex": "#EEF5FF", "name": "Sky Mist", "role": "App icon background"}, {"hex": "#BFDBFE", "name": "Soft Blue", "role": "Hover states"}], "creator": "SHL"}, {"id": "03", "name": "Link & Dine", "appName": "Chein", "tagline": "Connection made visible.", "logoFn": "LogoChainC", "accentColor": "#16A34A", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein အတွက် အထူးညွှန်းဆိုချက် — ချိန်းကြိုးကွင်း (Chain links) များဖြင့် 'C' စာလုံးကို ဖွဲ့စည်းထားပြီး Modern Tech ပုံစံ ခံစားချက်ကို ပေးစွမ်းပါသည်။", "visual": "အက္ခရာ 'C' ပုံစံကို ချိန်းကြိုးကွင်း (Chain link) ဂျီဩမေတြီ ပုံစံများဖြင့် ဖန်တီးထားပါသည်။ C ၏ ထိပ်နှင့် အောက်ခြေတွင် ချိတ်ဆက်ထားသော အိုဗယ်ကွင်း ၂ ကွင်းပါရှိပြီး လိုင်းထူထူ 5px stroke ဖြင့် ခိုင်မာစွာ ဆွဲသားထားပါသည်။ ပွင့်လင်းသော လိုင်းအနုပညာ (Line art) စတိုင်လ် ဖြစ်ပါသည်။", "rationale": "\"Chein\" သည် အင်္ဂလိပ်စာလုံး Chain (ချိန်းကြိုး/ချိတ်ဆက်မှု) နှင့် အသံထွက်ဆင်တူပြီး စားသောက်ဆိုင်များနှင့် စားသုံးသူများကို ချိတ်ဆက်ပေးခြင်းဟူသော အဓိပ္ပာယ်ကို ဆောင်ပါသည်။ သန့်ရှင်းသော Emerald Green အရောင်သည် အခြား နီ/လိမ္မော်ရောင် အစားအသောက် app များကြားတွင် သီးသန့်ထင်ရှား စွဲမက်ဖွယ် ဖြစ်စေပါသည်။", "typography": "Condensed Geometric Sans — Barlow Condensed or DIN Condensed Bold. The compressed letterforms echo the tight chain-link shapes. Pair sub-labels in DM Mono for technical credibility.", "prompt": "Minimalist logo for a restaurant reservation app called \"Chein\". The letter C formed from 4–5 interlocking chain-link oval rings that together arc into a C shape, each oval with a 2px stroke, unfilled interior. The C arc itself is a bold 5px stroke. Pure line-art. Emerald green #16A34A on mint-white #F0FDF4. Flat 2D vector, no gradients, no shadows. 1024×1024 app icon format. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#16A34A", "name": "Emerald Link", "role": "Primary brand / CTA"}, {"hex": "#F0FDF4", "name": "Mint Canvas", "role": "App icon background"}, {"hex": "#14532D", "name": "Forest Deep", "role": "Text / secondary"}, {"hex": "#86EFAC", "name": "Spring Leaf", "role": "Hover states"}], "creator": "SHL"}, {"id": "04", "name": "The Clockset", "appName": "SarMal", "tagline": "Every meal has its moment.", "logoFn": "LogoReservationArc", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ရှေးရိုးရာ အကွက်ဖော် နာရီမျက်နှာပြင်ကို အရိုးရှင်းဆုံး လိုင်းများဖြင့် ဖော်ပြထားပါသည်။ ၁၂ နာရီနေရာတွင် ခက်ရင်း silhouette နှင့် ၆ နာရီနေရာတွင် ဓား silhouette ကို ထည့်သွင်းထားပါသည်။ အောက်ခြေတွင် ဘိုကင်စားပွဲနှင့် ထိုင်ခုံသင်္ကေတ လိုင်းတိုလေးများ ပါရှိပြီး အောက်၌ 'SARMAL' ဟူသော Monospace စာလုံးပါရှိပါသည်။", "rationale": "နာရီမျက်နှာပြင်သည် 'အချိန်ကို လေးစားတန်ဖိုးထားမှု' ကို ဖော်ပြသော သက္ကေတ ဖြစ်ပါသည်။ ၁၂ နာရီနှင့် ၆ နာရီတွင် ခက်ရင်းနှင့် ဓားကို ထည့်သွင်းခြင်းဖြင့် နာရီသည် အစားအသောက် စားသုံးချိန်အဖြစ် အသွင်ပြောင်းသွားပါသည်။ Ivory နှင့် Amber အရောင်များသည် ရိုးရိုးရှင်းရှင်းနှင့် အဆင့်အတန်းမြင့်မားသော ခံစားမှုကို ပေးစွမ်းပါသည်။", "typography": "Transitional Serif Display — DM Serif Display or Playfair Display for the wordmark. Pair with Inter Light for interface body copy. The contrast between editorial serif and geometric clock icon creates sophisticated tension.", "prompt": "Elegant minimalist logo for a restaurant booking app \"SarMal\". An analog clock face reduced to outer ring, hour and minute hands (pointing to 7:20), a center dot, with a fork silhouette replacing 12 o'clock tick and knife at 6 o'clock. Below: a horizontal line with small chair tick marks. Below that: \"SARMAL\" in wide-tracked mono capitals. Amber #D97706 on ivory #FDF8F0, terracotta #92400E lettering. Flat editorial vector. 1024×1024. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#D97706", "name": "Amber Toast", "role": "Primary / strokes"}, {"hex": "#FDF8F0", "name": "Ivory Linen", "role": "App icon background"}, {"hex": "#92400E", "name": "Walnut Brown", "role": "Secondary / text"}, {"hex": "#FEF3C7", "name": "Warm Canvas", "role": "Light surface"}], "creator": "SHL"}, {"id": "05", "name": "Editorial Stacked", "appName": "ChateMal", "tagline": "The name IS the mark.", "logoFn": "LogoStackedWordmark", "accentColor": "#C2830A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "သန့်ရှင်းသော စာလုံးဒီဇိုင်း (Typographic Wordmark) ဖြစ်ပါသည်။ 'Chat' ကို မတ်မတ် DM Serif Display (အနက်ရောင်) ဖြင့် ရေးသားပြီး အောက်တွင် 'eMal' ကို စောင်းထားသော ရွှေဝါရောင် အီတဲလစ် (Gold Ochre Italic) ဖြင့် အထပ်ထပ်ရေးသားထားပါသည်။ အပေါ်နှင့် အောက်တွင် မျဉ်းကြောင်းပါးပါးလေးများဖြင့် စည်းစနစ်တကျ ဘောင်ခတ်ထားပါသည်။", "rationale": "ကမ္ဘာ့ထိပ်တန်း စားသောက်ဆိုင် Brand အများစုသည် သင်္ကေတမပါဘဲ စာလုံးသီးသန့် Wordmark ကို အသုံးပြုကြပါသည်။ Standard အက္ခရာနှင့် Italic အက္ခရာ ပေါင်းစပ်မှုက 'Chat' ၏ ခိုင်မာမှုနှင့် 'eMal' ၏ စားပွဲဘိုကင် လက်မှတ် ရေးထိုးမှု ခံစားချက်ကို တပြိုင်နက်တည်း ပေးစွမ်းပါသည်။", "typography": "DM Serif Display for display headings and the wordmark. Inter 400 for body copy. DM Mono 300 for data labels and timestamps. Track headings at −0.02em; track mono labels at +0.12em.", "prompt": "Minimalist editorial typographic logo for \"ChateMal\". Pure wordmark — no icon. \"Chat\" in regular-weight transitional serif (near-black #1C1917), \"eMal\" directly below in italic transitional serif (warm gold #C2830A). A thin horizontal rule above spanning full width. Below, a hairline divider followed by micro-caption \"DINE · BOOK · CONNECT\" in wide-tracked mono capitals in gray. Background: warm white #FAFAF9. Ultra-clean, no textures, no gradients. 1024×1024. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#1C1917", "name": "Sable Black", "role": "Primary wordmark"}, {"hex": "#C2830A", "name": "Gold Ochre", "role": "Italic accent / secondary"}, {"hex": "#FAFAF9", "name": "Warm White", "role": "App icon background"}, {"hex": "#E5E5E4", "name": "Pale Stone", "role": "Hairline rules"}], "creator": "SHL"}, {"id": "06", "name": "Spiral Bowl", "appName": "SarMal", "tagline": "From the first ring to the last bite.", "logoFn": "LogoSarMalBowl", "accentColor": "#E85D04", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ဇလုံ / ပန်းကန်လုံးကို အပေါ်မှ စီးမိုးကြည့်သည့် ပုံစံ (Top-down view) ဖြစ်ပြီး စက်ဝိုင်း ၃ ထပ်ဖြင့် ဖွဲ့စည်းထားပါသည်။ အပြင်စက်ဝိုင်း၊ အလယ် solid စက်ဝိုင်းနှင့် အထဲက မျဉ်းစက်စက်ဝိုင်းတို့ပါရှိပြီး ဗဟိုတွင် အစက်အပြည့် ပါရှိပါသည်။ ညာဘက်အပေါ်မှ ထုတ်ထားသော တုတ်ချောင်း/ယောက်ချိုလိုင်းက စက်ဝိုင်းအချိုးအစားကို လှပစွာ ဖြတ်သန်းထားပါသည်။", "rationale": "SarMal (စားမယ်) ၏ စပိုင်ရယ် စက်ဝိုင်းပုံစံသည် သန့်ရှင်းပြီး မျက်စိထဲတွင် စွဲထင်လွယ်ပါသည်။ Target / Bullseye ပုံစံ ပါဝင်သဖြင့် သုံးစွဲသူ၏ ဘိုကင်နှင့် အစားအသောက် လိုလားချက်ကို တိကျစွာ ဖြည့်ဆည်းပေးနိုင်မှုကို ဖော်ပြနေပါသည်။ Ember Orange အရောင်သည် အစားအသောက် စားချင်စိတ်ကို အပြည့်အဝ နှိုးဆွပေးပါသည်။", "typography": "Humanist Sans-serif — Nunito or Quicksand. Soft, rounded letterforms match the bowl's curved geometry. Bold weight for headlines, Regular for subtext. The friendly roundness signals warmth and community dining.", "prompt": "Minimalist flat app icon for restaurant app \"SarMal\". Top-down aerial view of a bowl as three concentric circles — thick outer ring, medium middle ring (solid stroke), inner dashed ring — with a small filled dot at center. A clean diagonal line (chopstick/ladle handle) extends from the bowl at the top-right, breaking circle symmetry. Vivid ember orange #E85D04 all strokes on clean porcelain white #FFF9F5. Ultra-flat 2D vector, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#E85D04", "name": "Ember Orange", "role": "Primary brand / CTA"}, {"hex": "#FFF9F5", "name": "Porcelain", "role": "App icon background"}, {"hex": "#7C2D12", "name": "Mahogany", "role": "Text / depth"}, {"hex": "#FDBA74", "name": "Apricot", "role": "Secondary / hover"}], "creator": "SHL"}, {"id": "07", "name": "Tine Links", "appName": "Chein", "tagline": "A fork. A chain. One idea.", "logoFn": "LogoCheinFork", "accentColor": "#059669", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ရိုးရှင်းသော ခက်ရင်း လိုင်းအနုပညာဖြစ်သော်လည်း ခက်ရင်း၏ ထိပ်ချွန်း ၃ ချောင်းသည် မျဉ်းဖြောင့် မဟုတ်ဘေး အိုဗယ်ပုံစံ ချိန်းကြိုးကွင်း (Chain link) များအဖြစ် ပြောင်းလဲသွားပါသည်။ ခက်ရင်းလက်တံသည် ဖြောင့်တန်းသော လိုင်းတစ်ခုဖြစ်ပါသည်။", "rationale": "Chein (ချိန်း) အမည်၏ ချိန်းကြိုးသဘောတရားနှင့် Dining (စားသောက်မှု) ၏ ခက်ရင်းသဘောတရားကို တစ်ခုတည်းတွင် ပေါင်းစပ်ထားသော ဒီဇိုင်းဖြစ်ပါသည်။ Jade Green အရောင်သည် လတ်ဆတ်မှုနှင့် ကျန်းမာရေးနှင့် ညီညွတ်သော အစားအသောက်များကို ဖော်ညွှန်းပါသည်။", "typography": "Condensed Geometric Bold — Barlow Condensed ExtraBold or Archivo Narrow. The narrow, tall letterforms mirror the vertical fork geometry. Use Inter Regular for all body and UI text to balance the aggressive headline weight.", "prompt": "Minimalist line-art logo icon for restaurant reservation app \"Chein\". A clean fork drawn in pure strokes — single vertical handle, three tines — but each tine ends in a small oval chain-link shape (like a rounded loop) instead of a straight point. No fill anywhere, only outlines. Jade green #059669 on mint-white #F0FFF4. 2D flat vector, absolutely no gradients or shadows, ultra-minimal. 1024×1024 app icon with rounded corner mask. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#059669", "name": "Jade Green", "role": "Primary brand"}, {"hex": "#F0FFF4", "name": "Mint White", "role": "App icon background"}, {"hex": "#065F46", "name": "Evergreen", "role": "Text / secondary"}, {"hex": "#6EE7B7", "name": "Seafoam", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "08", "name": "The Arch Door", "appName": "ChateMal", "tagline": "Enter the experience.", "logoFn": "LogoChateMalArch", "accentColor": "#BE185D", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ရောမစတိုင်လ် မုခ်ဦး (Arch) Outline ပုံစံဖြစ်ပြီး ကြိုဆိုဧည့်ခံမှုကို ဖော်ပြပါသည်။ Arch မုခ်ဦး၏ အလယ်တွင် ခက်ရင်း silhouette တစ်ခုသည် တံခါးလက်ကိုင်အဖြစ် မတ်မတ်ရပ်တည်နေပြီး ထိပ်ချွန်းများမှာ အပေါ်သို့ ဦးတည်နေပါသည်။ အလယ်တွင် လင်းလက်သော အစက်လေးတစ်ခု ပါရှိပါသည်။", "rationale": "Arch မုခ်ဦးသည် ဗိသုကာပညာတွင် ကြိုဆိုဧည့်ခံခြင်း၏ ရှေးအကျဆုံး သင်္ကေတဖြစ်ပါသည်။ ChateMal အတွက် Arch သည် 'လှမ်းလာပါ၊ ထိုင်ပါ၊ သုံးဆောင်ပါ' ဟူသော သဝဏ်လွှာကို ပေးပါသည်။ တံခါးလက်ကိုင်အဖြစ် ခက်ရင်းကို သုံးထားခြင်းက သုံးစွဲသူများကို ပြုံးရွှင်စေမည့် Clever Visual Pun တစ်ခုဖြစ်ပါသည်။", "typography": "Elegant Geometric Sans — Outfit Medium or DM Sans. The clean, slightly humanist strokes complement the architectural arch geometry without competing. Use italic variant for the wordmark tagline. Body copy in Inter Regular.", "prompt": "Minimalist logo for restaurant booking app \"ChateMal\". A clean Romanesque arch outline (two vertical pillars, one curved top arc) with a fork silhouette centered inside the arch as a door handle — tines pointing upward. A small circle dot at the fork's center suggests interior light. Base horizontal line. Word \"CHATEMAL\" in wide-tracked mono capitals below. Rose pink #BE185D strokes on blush white #FFF0F5. Flat 2D vector, no gradients, no shadows, purely minimal. 1024×1024 rounded square. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#BE185D", "name": "Rose Petal", "role": "Primary brand"}, {"hex": "#FFF0F5", "name": "Blush Canvas", "role": "App icon background"}, {"hex": "#831843", "name": "Deep Rosewood", "role": "Text / depth"}, {"hex": "#FBCFE8", "name": "Petal Pink", "role": "Hover / light surface"}], "creator": "SHL"}, {"id": "09", "name": "Hex Badge", "appName": "SarMal", "tagline": "Quality. Stamped.", "logoFn": "LogoSarMalStar", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Michelin-star စတိုင်လ် ခြောက်ထောင့်ပုံစံ တံဆိပ် (Hexagonal Badge) ဖြစ်ပြီး အထဲတွင် မျဉ်းစက် ခြောက်ထောင့်ကွင်း ပါရှိပါသည်။ ဗဟိုတွင် ခက်ရင်းနှင့် ဓားတို့သည် ဘယ်ညာ အချိုးညီစွာ မတ်မတ်ရပ်တည်နေကြပါသည်။ အောက်တွင် 'SARMAL' ဟူသော စာလုံးပါရှိပါသည်။", "rationale": "Hexagon Badge သည် အရည်အသွေးမြင့်မားမှု၊ စိစစ်ရွေးချယ်ထားမှုနှင့် ယုံကြည်စိတ်ချရမှုကို ဖော်ပြပါသည်။ Amber-Gold အရောင်သည် ရိုးရိုး အစားအသောက် app များနှင့်မတူဘဲ အဆင့်အတန်းမြင့် စားသောက်ဆိုင် ဘိုကင်စနစ် ခံစားချက်ကို ပေးစွမ်းပါသည်။", "typography": "Slab Serif — Roboto Slab or Zilla Slab Bold. The sturdy serifs reinforce the badge's sense of permanence and trust. Use a light-weight slab for subtext to create clear hierarchy. Avoid rounded sans here — the brand needs structure, not softness.", "prompt": "Minimalist badge-style logo for restaurant app \"SarMal\". A clean hexagon outline (badge/seal shape) with a secondary inner hexagon in dashed strokes. Inside: a fork and knife standing upright in mirror symmetry, handles touching the inner hex border, tines pointing up. No fill, pure outline art. Amber gold #D97706 on cream parchment #FFFBEB background. Below badge: \"SARMAL\" in wide-tracked mono. Ultra-flat 2D vector, no drop shadows, no gradients. 1024×1024 rounded square. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#D97706", "name": "Amber Gold", "role": "Primary brand / badge"}, {"hex": "#FFFBEB", "name": "Cream Parchment", "role": "App icon background"}, {"hex": "#92400E", "name": "Cognac", "role": "Text / depth"}, {"hex": "#FDE68A", "name": "Honey", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "10", "name": "Node Network", "appName": "Chein", "tagline": "Every table. Every connection.", "logoFn": "LogoCheinNodes", "accentColor": "#7C3AED", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "နက်ဝပ်ကွန်ရက်ပုံစံ (Node Network Diagram) ဖြစ်ပြီး အပေါ် Node နှစ်ခုတွင် ခက်ရင်းနှင့် ဓားပုံစံပါရှိကာ၊ အလယ်အောက် Node တွင် concentric စက်ဝိုင်း ပန်းကန်ပြားပုံစံ ပါရှိပါသည်။ အောက်ဆုံး Node သည် သုံးစွဲသူကို ကိုယ်စားပြုပြီး မျဉ်းကြောင်းများဖြင့် အပြန်အလှန် ချိတ်ဆက်ထားပါသည်။", "rationale": "နက်ဝပ်ကွန်ရက်သည် 'ပလပ်ဖောင်း' နှင့် 'ချိတ်ဆက်မှု' ကို ဖော်ပြသော Modern Tech သင်္ကေတဖြစ်ပါသည်။ Chein အတွက် သုံးစွဲသူနှင့် စားသောက်ဆိုင်များကို နက်ဝပ်သဖွယ် ချိတ်ဆက်ပေးမှုကို ဖော်ပြပြီး Electric Violet အရောင်က နက်ရှိုင်းဆန်းသစ်မှုကို ပေးပါသည်။", "typography": "Geometric Sans — Inter Bold or Geist Bold for headlines. The neutral, structured letterforms contrast the conceptual icon without competing. Use Inter Mono for reservation timestamps and table data. Both are available via Google Fonts and wire in without friction.", "prompt": "Minimalist network-diagram logo for restaurant app \"Chein\". Three nodes connected by thin lines: top-left node (small circle containing a fork icon), top-right node (small circle containing a knife icon), center-bottom node (a slightly larger circle with concentric inner ring representing a plate). Lines connect all three nodes. A fourth small node below the plate connected by a vertical line represents the user, containing three short parallel lines (a menu/list icon). Text \"CHEIN\" in wide-tracked mono below. Electric violet #7C3AED on lavender-white #F5F3FF. Pure 2D flat vector, no shadows, no gradients. 1024×1024 rounded square. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#7C3AED", "name": "Electric Violet", "role": "Primary brand"}, {"hex": "#F5F3FF", "name": "Lavender Mist", "role": "App icon background"}, {"hex": "#4C1D95", "name": "Deep Indigo", "role": "Text / secondary"}, {"hex": "#DDD6FE", "name": "Soft Lilac", "role": "Hover / light surface"}], "creator": "SHL"}, {"id": "11", "name": "Leaf & Fork", "appName": "SarMal", "tagline": "Fresh. Natural. Yours.", "logoFn": "LogoSarMalLeaf", "accentColor": "#15803D", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အချိုးညီ သစ်ရွက် silhouette ပုံစံဖြစ်ပြီး သစ်ရွက်၏ အလယ်ရိုးတံသည် ခက်ရင်းလက်ကိုင်အဖြစ် ပြောင်းလဲသွားကာ သစ်ရွက်ထိပ်တွင် ခက်ရင်းထိပ်ချွန်းများ ထွက်ပေါ်နေပါသည်။ သဘာဝသစ်ရွက်မျဉ်းကွေးများ ပါရှိပါသည်။", "rationale": "သဘာဝသစ်ရွက်နှင့် ခက်ရင်း ပေါင်းစပ်မှုသည် 'လတ်ဆတ်မှု'၊ 'Farm-to-table' နှင့် ကျန်းမာရေးနှင့် ညီညွတ်သော အစားအသောက်များကို ဖော်ပြပါသည်။ Forest Green အရောင်သည် စိတ်ကို အေးချမ်းစေပြီး ယုံကြည်မှု တိုးပွားစေပါသည်။", "typography": "Humanist Sans-serif — Lato or Source Sans 3. Natural, open letterforms that breathe and feel \"grown, not built.\" Bold weight for the wordmark; Light for subtext. Avoid geometric or condensed styles — they clash with the organic leaf energy.", "prompt": "Minimalist organic logo for a restaurant booking app \"SarMal\". A symmetrical leaf shape formed by two curved mirrored strokes meeting at a center stem, the stem and central vein merging seamlessly into a fork handle with tines emerging from the leaf tip. Gentle secondary vein curves inside the leaf for texture. Deep forest green #15803D strokes on spring-mist background #F0FFF4. Flat 2D vector, no gradients, no shadows, purely botanical and clean. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#15803D", "name": "Forest Green", "role": "Primary brand / CTA"}, {"hex": "#F0FFF4", "name": "Spring Mist", "role": "App icon background"}, {"hex": "#14532D", "name": "Deep Canopy", "role": "Text / secondary"}, {"hex": "#86EFAC", "name": "Leaf Glow", "role": "Accent / hover"}], "creator": "SHL"}, {"id": "12", "name": "Venn & Dine", "appName": "Chein", "tagline": "Where hunger meets place.", "logoFn": "LogoCheinRing", "accentColor": "#1D4ED8", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ထပ်နေသော စက်ဝိုင်းနှစ်ခု (Venn diagram) ဖြစ်ပြီး ဘယ်ဘက်စက်ဝိုင်းတွင် ခက်ရင်း silhouette ပါရှိကာ ညာဘက်စက်ဝိုင်းတွင် Amber ရောင် လိုကေးရှင်း ပင်နံပါတ် (Location Pin) ပါရှိပါသည်။ စက်ဝိုင်းနှစ်ခု ထပ်နေသော နေရာသည် ဆုံမှတ်ဖြစ်ပါသည်။", "rationale": "Venn Diagram သည် 'အရာနှစ်ခု ဆုံစည်းခြင်း' ကို ထိရောက်စွာ ဖော်ပြပါသည်။ စားသုံးသူ (ခက်ရင်း) + စားသောက်ဆိုင် (Location Pin) = Chein ဘိုကင် ဟူသော သဘောတရားကို အထူးပေါ်လွင်စေပါသည်။ Blue + Amber ရောင်စုံသည် Contrast အလွန်ကောင်းမွန်ပါသည်။", "typography": "Confident Geometric Sans — Outfit Bold or Raleway Bold. The assertive letterforms match the bold Venn diagram geometry. Use Inter Medium for subheadings and booking interface copy. Amber accent color on blue creates high-contrast call-to-action states.", "prompt": "Minimalist logo icon for restaurant app \"Chein\". Two overlapping circles (Venn diagram) with clean outlines — left circle contains a minimal fork silhouette (line art), right circle contains a location pin icon (circle top, downward point, filled center dot) in amber yellow. Where circles overlap is a lighter intersection zone. Deep cobalt blue #1D4ED8 outlines and fork, amber #F59E0B for pin, ice blue #EFF6FF background. Flat 2D vector, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#1D4ED8", "name": "Cobalt Deep", "role": "Primary brand"}, {"hex": "#EFF6FF", "name": "Ice Blue", "role": "App icon background"}, {"hex": "#F59E0B", "name": "Amber Signal", "role": "Accent / location pin"}, {"hex": "#BFDBFE", "name": "Sky Wash", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "13", "name": "Steam & Story", "appName": "ChateMal", "tagline": "Every meal tells a story.", "logoFn": "LogoChateMalWave", "accentColor": "#EA580C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ထောင့်ဝိုင်း စကားပြောစက္ကူပူပေါင်း (Speech Bubble) ဖြစ်ပြီး အတွင်း၌ မီနူး/စာကြောင်း မျဉ်း ၃ ကြောင်း ပါရှိပါသည်။ Bubble ၏ အမြီးသည် အောက်သို့ ရွေ့လျားသွားကာ လှိုင်းပုံစံ အငွေ့အဖြစ် ပြောင်းလဲသွားပြီး အဆုံးတွင် အစက်ဝိုင်း ပါရှိပါသည်။", "rationale": "ChateMal ၏ အတွေးအခေါ်မှာ 'စားသောက်ခြင်းသည် စကားဝိုင်းတစ်ခုဖြစ်သည်' ဟူ၍ ဖြစ်ပါသည်။ စကားပြောစက္ကူပူပေါင်းမှ အစားအသောက်အငွေ့သို့ ကူးပြောင်းပုံသည် စကားဝိုင်းနှင့် အစားအစာ၏ ချိတ်ဆက်မှုကို အနုပညာဆန်စွာ ဖော်ပြနေပါသည်။", "typography": "Friendly Geometric Sans — Poppins SemiBold or Nunito Bold. The rounded letterforms harmonize with the bubble's soft corners. Pair with Inter Regular for body text to keep the interface readable. Avoid all-caps wordmarks here — the conversational brand needs lowercase approachability.", "prompt": "Minimalist logo for restaurant booking app \"ChateMal\". A clean rounded-rectangle speech bubble outline with three horizontal lines inside (like a menu or text lines). The speech bubble tail flows continuously into a curving waveform line that ends in a small filled circle (representing steam, a plate, or a cup). Single continuous stroke concept. Deep burnt orange #EA580C on warm cream #FFF7F0. Flat 2D vector, no gradients, no fill areas, pure line art. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#EA580C", "name": "Burnt Sienna", "role": "Primary brand"}, {"hex": "#FFF7F0", "name": "Warm Cream", "role": "App icon background"}, {"hex": "#9A3412", "name": "Terracotta", "role": "Text / depth"}, {"hex": "#FED7AA", "name": "Peach Haze", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "14", "name": "The S Monogram", "appName": "SarMal", "tagline": "One letter. Every meal.", "logoFn": "LogoSarMalMonogram", "accentColor": "#292524", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အက္ခရာ 'S' ကို ဂျီဩမေတြီ မျဉ်းကွေးကြီးများဖြင့် ဆွဲသားထားပြီး အပေါ်မျဉ်းကွေးသည် ဇွန်းဇလုံပုံစံ ဖြစ်ကာ အောက်မျဉ်းကွေးသည် ခက်ရင်းလက်တံဖြစ်ပါသည်။ 'S' ၏ ထိပ်တွင် ရွှေဝါရောင် ခက်ရင်းထိပ်ချွန်း လိုင်း ၃ ကြောင်း ပါရှိပါသည်။", "rationale": "SarMal ၏ အစစာလုံး 'S' ကို Monogram အဖြစ် သုံးထားခြင်းဖြစ်ပြီး Luxury High-end Brand ခံစားမှုကို ပေးပါသည်။ အနက်ရောင် stroke ကြီးနှင့် Gold accent တို့၏ Contrast သည် အလွန်အဆင့်အတန်း မြင့်မားပါသည်။", "typography": "High-Contrast Transitional Serif — Cormorant Garamond or EB Garamond for the wordmark. The razor-sharp contrast between thick and thin strokes mirrors the bold-yet-delicate S monogram. Body copy in Inter 300 (Light) to maintain the premium air. Zero rounded fonts in this system — every letterform must have deliberate structure.", "prompt": "Minimalist luxury monogram logo for restaurant app \"SarMal\". A single large bold \"S\" letterform constructed from two thick opposing arcs — the top arc shaped like a spoon bowl, the bottom arc like a fork handle. Three short tine lines emerge from the top of the S like fork prongs, rendered in warm gold. The S body in near-black #292524, gold tines in #D97706, pure white #FAFAF9 background. Ultra-clean editorial vector, no gradients, no shadows, high-contrast stroke widths. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#292524", "name": "Carbon Black", "role": "Primary monogram"}, {"hex": "#FAFAF9", "name": "Pure White", "role": "App icon background"}, {"hex": "#D97706", "name": "Old Gold", "role": "Tine accent / highlights"}, {"hex": "#78716C", "name": "Warm Slate", "role": "Secondary / subtext"}], "creator": "SHL"}, {"id": "15", "name": "Drop & Plate", "appName": "Chein", "tagline": "Find. Arrive. Eat.", "logoFn": "LogoCheinMapPin", "accentColor": "#9333EA", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein အတွက် အထူးညွှန်းဆိုချက် — Map Location Pin အတွင်း ပန်းကန်ပြားပုံစံ ထည့်သွင်းထားသဖြင့် 'စားသောက်ဖွယ်ရာ နေရာများ ရှာဖွေခြင်း' ကို ချက်ချင်း ဖော်ပြနေပါသည်။", "visual": "လိုကေးရှင်း ပင်နံပါတ် (Map Pin) ပုံစံအတွင်း၌ အပေါ်မှ စီးမိုးကြည့်ရသော ပန်းကန်ပြား စက်ဝိုင်းပုံစံ ပါရှိပါသည်။ အောက်ခြေတွင် ခရီးလမ်းကြောင်းကို ဖော်ပြသော မျဉ်းစက်တိုလေးများနှင့် အစက်ဝိုင်း ပါရှိပါသည်။", "rationale": "အနီးနားရှိ စားသောက်ဆိုင်များကို ရှာဖွေခြင်းသည် Map Pin မှ စတင်ပါသည်။ Pin အတွင်း ပန်းကန်ပြား ပါရှိခြင်းက 'သင်ရောက်ရှိမည့် အစားအသောက်နေရာ' ကို ဖော်ပြပြီး Deep Violet အရောင်က ပေါ်လွင်ဆန်းသစ် စေပါသည်။", "typography": "Modern Geometric Sans — Space Grotesk Bold or Cabinet Grotesk. The slightly quirky, characterful letterforms align with Chein's bold-outsider brand positioning. Inter Regular for body copy and booking details. The typeface combination feels tech-forward without being cold — perfectly calibrated for the app-native generation.", "prompt": "Minimalist logo for restaurant discovery app \"Chein\". A teardrop map location-pin outline containing inside it a top-down plate: two concentric circles (outer ring solid, inner ring dashed) with a small filled circle at center. Below the pin base: a short dotted horizontal line ending in a solid circle (representing a route/destination). Below: \"CHEIN\" in wide-tracked mono capitals. Rich deep violet #9333EA strokes on orchid-mist background #FDF4FF. Flat 2D vector art, no gradients, no shadows, ultra-clean. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#9333EA", "name": "Deep Violet", "role": "Primary brand"}, {"hex": "#FDF4FF", "name": "Orchid Mist", "role": "App icon background"}, {"hex": "#6B21A8", "name": "Plum Dark", "role": "Text / depth"}, {"hex": "#E9D5FF", "name": "Lavender Soft", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "16", "name": "Paper Lantern", "appName": "ChateMal", "tagline": "Light the way to every table.", "logoFn": "LogoChateMalLantern", "accentColor": "#EA580C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အာရှ ရိုးရာ စက္ကူမီးအိမ် outline ပုံစံဖြစ်ပြီး ဘေးတွင် အကွေးလိုင်းများ ပါရှိပါသည်။ မီးအိမ်၏ အောက်ခြေတွင် Chat Bubble အမြီးလေး ပါရှိပြီး အလယ်တွင် လင်းလက်သော မီးရောင် စက်ဝိုင်းကွင်း ပါရှိပါသည်။", "rationale": "စက္ကူမီးအိမ်သည် အာရှ စားသောက်ဆိုင် ယဉ်ကျေးမှု၏ 'ကြိုဆိုဧည့်ခံမှု' သင်္ကေတ ဖြစ်ပါသည်။ ChateMal အတွက် မီးအိမ်အောက်ခြေ၌ Chat bubble အမြီး ထည့်သွင်းထားခြင်းက စကားဝိုင်းနှင့် ဧည့်ခံမှုကို ပေါင်းစည်းပေးပါသည်။", "typography": "Warm Humanist Sans — Nunito SemiBold or Jost Medium. The soft, approachable letterforms mirror the lantern's round organic shape. Pair with Inter Regular for body and booking copy. Avoid sharp geometric or condensed styles — the brand needs warmth and roundness throughout.", "prompt": "Minimalist logo for restaurant booking app \"ChateMal\". A paper lantern outline — oval body with two thin vertical arc ribs on each side, flat rectangular top cap and bottom cap, short hanging string. The bottom features a small triangular speech-bubble tail. A subtle concentric ring at center glows like lantern light. Burnt orange #EA580C strokes on rice-paper white #FFF8F0. Pure flat 2D vector, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#EA580C", "name": "Lantern Flame", "role": "Primary brand"}, {"hex": "#FFF8F0", "name": "Rice Paper", "role": "App icon background"}, {"hex": "#C2410C", "name": "Deep Ember", "role": "Caps / secondary"}, {"hex": "#FED7AA", "name": "Warm Glow", "role": "Hover / inner light"}], "creator": "SHL"}, {"id": "17", "name": "Infinite Hospitality", "appName": "SarMal", "tagline": "Endless dining. Endless warmth.", "logoFn": "LogoSarMalRibbon", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အဆုံးမရှိသော Figure-8 (Infinity Symbol) ဖဲကြိုးလိုင်း ဖြစ်ပါသည်။ ဘယ်ဘက် ကွင်းအကွေးတွင် ခက်ရင်းထိပ်ချွန်း လိုင်း ၃ ကြောင်း ပါရှိပြီး ညာဘက် ကွင်းအောက်ခြေသည် ဇွန်းပုံစံ စက်ဝိုင်းအဖြစ် ပိတ်သွားပါသည်။", "rationale": "Infinity သင်္ကေတသည် 'အဆုံးမရှိသော ဝန်ဆောင်မှုနှင့် ပျော်ရွှင်မှု' ကို ဖော်ပြပါသည်။ SarMal အတွက် အဆုံးမရှိသော အစားအသောက် အတွေ့အကြုံများကို ဖော်ညွှန်းပြီး Crimson Rose အရောင်က ကြည်နူးဖွယ်ရာ စားသောက်ချိန်များကို အမှတ်ရစေပါသည်။", "typography": "Elegant Display Serif — EB Garamond Medium or Cormorant SemiBold. The graceful, flowing letterforms echo the ribbon's continuous curve. Use Inter Light for booking copy to create airy contrast. The overall typographic system feels celebratory — appropriate for special occasion dining.", "prompt": "Minimalist logo for restaurant reservation app \"SarMal\". A smooth figure-8 / infinity symbol rendered as a single continuous curved stroke, 2.5px weight. The left loop has three short parallel fork-tine lines extending from its upper-left arc. The right loop's bottom closes into a small spoon-bowl semicircle. Crimson rose #E11D48 strokes on blush white #FFF5F5. Ultra-flat 2D vector, no fills, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#E11D48", "name": "Crimson Rose", "role": "Primary brand / CTA"}, {"hex": "#FFF5F5", "name": "Blush White", "role": "App icon background"}, {"hex": "#9F1239", "name": "Deep Berry", "role": "Text / secondary"}, {"hex": "#FECDD3", "name": "Petal Blush", "role": "Hover / secondary surface"}], "creator": "SHL"}, {"id": "18", "name": "Your Print", "appName": "Chein", "tagline": "Your taste. Your table. Your Chein.", "logoFn": "LogoCheinFingerprint", "accentColor": "#16A34A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "လူ၏ လက်ဗွေရာ (Fingerprint) ပုံစံ အကွေးလိုင်းများ ဖြစ်ပြီး ထိပ်ဗဟိုတွင် ခက်ရင်းထိပ်ချွန်း လိုင်း ၃ ကြောင်းဖြင့် သဘာဝကျစွာ ဖြတ်သန်းထားပါသည်။ အောက်ခြေလိုင်းများကို မျဉ်းစက်များအဖြစ် ရေးဆွဲထားပါသည်။", "rationale": "လက်ဗွေရာသည် 'သီးသန့် ကိုယ်ပိုင်အမှတ်အသား' ဖြစ်ပါသည်။ Chein ၏ သုံးစွဲသူ တစ်ဦးချင်းစီအတွက် သီးသန့် စိတ်ကြိုက် စားသောက်ဆိုင် ဘိုကင်ညွှန်းဆိုပေးမှုကို Fingerprint + Fork ဖြင့် အနုပညာဆန်စွာ ဖော်ပြထားပါသည်။", "typography": "Structured Geometric Sans — DM Sans Bold or Instrument Sans. The clean geometric precision mirrors the fingerprint's structured ridge lines. Body copy in Inter Regular. Use monospace (DM Mono) for booking IDs and timestamps — it reinforces the \"personal code\" identity concept throughout the product interface.", "prompt": "Minimalist logo for restaurant app \"Chein\". A human fingerprint pattern formed from 8 concentric open arcs radiating from a filled center dot. The top-center of the fingerprint has a ridge break replaced by three short upward fork-tine lines. The lower arcs rendered as dashed lines for contrast. Emerald green #16A34A on clean mint #F0FDF4. Flat 2D vector, no gradients, no fill areas, pure line art. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#16A34A", "name": "Fingerprint Green", "role": "Primary brand"}, {"hex": "#F0FDF4", "name": "Clean Mint", "role": "App icon background"}, {"hex": "#14532D", "name": "Ridge Dark", "role": "Text / depth"}, {"hex": "#BBF7D0", "name": "Arc Light", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "19", "name": "The Diamond X", "appName": "SarMal", "tagline": "Precision meets pleasure.", "logoFn": "LogoSarMalDiamond", "accentColor": "#CA8A04", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "စိမ်ပွင့် / ဒိုင်းမွန် (Rhombus) ဘောင်ပုံစံ ဖြစ်ပြီး အတွင်း၌ မျဉ်းစက် ဒိုင်းမွန်ဘောင် ပါရှိပါသည်။ ဗဟိုတွင် ခက်ရင်းနှင့် ဓားတို့သည် ထောင့်ဖြတ် ဒေါင်လိုက် 'X' ပုံစံ ယှက်နွယ်နေကြပါသည်။", "rationale": "ဒိုင်းမွန်ပုံစံသည် အဆင့်မြင့် အရည်အသွေးနှင့် ရတနာကဲ့သို့ တန်ဖိုးရှိမှုကို ဖော်ပြပါသည်။ ကြက်ခြေခတ် ခက်ရင်းနှင့် ဓားသည် ရှေးရိုးရာ စားသောက်ဆိုင် အထိမ်းအမှတ် ဖြစ်ပြီး Gold ရောင်စုံက Premium ခံစားမှုကို ပေးပါသည်။", "typography": "High-Contrast Didone Serif — Bodoni Moda or Playfair Display Bold. The ultra-high contrast between thick and thin strokes mirrors the diamond's sharp geometry. Use Inter Light (weight 300) for all UI copy to create maximum contrast. This is the most luxury-positioned typographic system in the collection.", "prompt": "Minimalist luxury logo for restaurant app \"SarMal\". A clean diamond / rhombus outline (sharp corners). Inside: a dashed inner diamond half the size. Crossed diagonally inside: a fork (top-left to bottom-right, tines at top-left) and a knife (top-right to bottom-left, fine blade tip at top-right). All strokes, no fill. Antique gold #CA8A04 on parchment white #FEFCE8. Ultra-flat 2D vector, zero gradients, zero shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#CA8A04", "name": "Antique Gold", "role": "Primary brand"}, {"hex": "#FEFCE8", "name": "Parchment", "role": "App icon background"}, {"hex": "#713F12", "name": "Dark Ochre", "role": "Text / secondary"}, {"hex": "#FEF08A", "name": "Lemon Gold", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "20", "name": "Cup & Chat", "appName": "ChateMal", "tagline": "Where every coffee starts a conversation.", "logoFn": "LogoChateMalCup", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ကော်ဖီခွက်နှင့် အောက်ခံပန်းကန်ပြား ပုံစံဖြစ်ပြီး ခွက်အပေါ်မှ တက်လာသော အငွေ့များသည် ထပ်နေသော စကားပြော စက္ကူပူပေါင်း (Speech bubbles) ၂ ခုအဖြစ် အသွင်ပြောင်းသွားပါသည်။", "rationale": "ကော်ဖီဆိုင်များနှင့် စားသောက်ဆိုင်များသည် စကားဝိုင်းများ စတင်ရာ နေရာဖြစ်ပါသည်။ ခွက်အငွေ့မှ စကားပြောပူပေါင်းအဖြစ် ပြောင်းလဲပုံက မိတ်ဆွေဖွဲ့ခြင်းနှင့် မုန့်စားခြင်း၏ ပျော်ရွှင်မှုကို ဖော်ပြပါသည်။", "typography": "Warm Transitional Sans — Lora Medium or Merriweather Sans. The subtle serifs recall café chalkboards and artisan coffee packaging. Pair with Inter Regular for interface body copy. Amber gold as the CTA color on white backgrounds achieves WCAG AA contrast while remaining visually warm — an important balance for accessibility.", "prompt": "Minimalist logo for restaurant booking app \"ChateMal\". A clean coffee cup with saucer — trapezoidal cup body, horizontal rim line, small curved handle on the right, curved saucer line below. Above the cup, steam forms two overlapping speech-bubble outlines (smaller in front-left, larger behind-right) with small triangular tails pointing down toward the cup. Coffee amber #D97706 strokes on cream-latte background #FFF7ED, amber #F59E0B for speech bubbles. Flat 2D vector, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#D97706", "name": "Coffee Gold", "role": "Primary brand / CTA"}, {"hex": "#FFF7ED", "name": "Cream Latte", "role": "App icon background"}, {"hex": "#92400E", "name": "Espresso", "role": "Text / depth"}, {"hex": "#FDE68A", "name": "Steamed Milk", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "21", "name": "Calendar Date", "appName": "Chein", "tagline": "ချိန်း — Book your moment.", "logoFn": "LogoCheinCalendar", "accentColor": "#1D4ED8", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein အတွက် အကောင်းဆုံး ရွေးချယ်မှု (Top Pick) — 'ချိန်း' (Appointment) ၏ ရက်ချိန်းယူခြင်း သဘောတရားကို ပြက္ခဒိန်နှင့် ခက်ရင်းဖြင့် တိုက်ရိုက် ဖော်ပြထားသော ဒီဇိုင်းဖြစ်ပါသည်။", "visual": "ပြက္ခဒိန် စာရွက် outline ဖြစ်ပြီး အပေါ်တွင် ကွင်း ၃ ကွင်း ပါရှိပါသည်။ ပြက္ခဒိန်အတွင်းရှိ ရက်စွဲနံပါတ် နေရာတွင် ခက်ရင်း silhouette ကို အစားထိုး ထည့်သွင်းထားပါသည်။", "rationale": "'ချိန်း' (Chein) ဟူသည် ရက်ချိန်း/ဘိုကင် ယူခြင်းဖြစ်၍ ပြက္ခဒိန်သည် အထိရောက်ဆုံး သင်္ကေတဖြစ်ပါသည်။ ပြက္ခဒိန်ရက်စွဲနေရာတွင် ခက်ရင်းထည့်ထားခြင်းက 'အစားအသောက် စားသုံးမည့် ရက်ချိန်း' ကို တိုက်ရိုက် ဖော်ပြပါသည်။", "typography": "Confident Geometric Sans — Outfit Bold or Raleway Bold. The structured, grid-friendly letterforms match the calendar's rigid geometry. Use Inter Medium for booking copy and Inter Mono for date/time stamps. Tab-stop alignment in the interface mirrors the calendar grid visual language.", "prompt": "Minimalist flat logo for restaurant booking app \"Chein\" (Myanmar: ချိန်း, meaning appointment). A clean calendar page outline with rounded rectangle body, three small circular binding rings at the top edge, a filled header strip. Inside the calendar body: a fork silhouette serving as the date numeral — vertical handle as the stem, three tines at the top, a horizontal crossbar. Cobalt blue #1D4ED8 on schedule white #EFF6FF. Flat 2D vector, no gradients, no shadows, ultra-clean. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#1D4ED8", "name": "Cobalt Booking", "role": "Primary brand"}, {"hex": "#EFF6FF", "name": "Schedule White", "role": "App icon background"}, {"hex": "#1E3A8A", "name": "Deep Navy", "role": "Text / depth"}, {"hex": "#BFDBFE", "name": "Sky Blue", "role": "Hover / calendar grid"}], "creator": "SHL"}, {"id": "22", "name": "Dining Glass", "appName": "Chein", "tagline": "ချိန်း — Time is the rarest ingredient.", "logoFn": "LogoCheinHourglass", "accentColor": "#9333EA", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "သဲနာရီ (Hourglass) Outline ပုံစံဖြစ်ပြီး အပေါ်ခန်းတွင် concentric စက်ဝိုင်း ပန်းကန်ပြား ပါရှိကာ အလယ်မြှောင်နေရာမှ ခက်ရင်းထိပ်ချွန်း အစက်လေးများ အောက်ခန်းသို့ စိမ့်ထွက်ကျနေပါသည်။", "rationale": "'ချိန်း' ၏ အချိန် သဘောတရားကို သဲနာရီဖြင့် ဖော်ပြပြီး ပန်းကန်ပြားမှ အစားအသောက် အစက်လေးများ ကျဆင်းခြင်းက 'ဘိုကင်ယူထားသော အစားအသောက်အချိန် ရောက်ရှိလာခြင်း' ကို ဖော်ပြပါသည်။", "typography": "Quirky Geometric Sans — Space Grotesk Bold or Cabinet Grotesk Medium. The slightly unusual letterforms complement the hourglass's dramatic silhouette without competing. Body copy in Inter Regular. Use purple-tinted mono text for reservation timestamps — it reinforces the time-awareness brand theme throughout the product.", "prompt": "Minimalist logo for restaurant app \"Chein\" (Myanmar: ချိန်း, appointment). An hourglass outline — upper and lower bulbs, narrow waist. Upper bulb contains a top-down plate: two concentric circles with center dot. At the waist pinch: three small filled circles represent fork-tine grains of sand flowing down. Lower chamber shows two short horizontal lines (appointment slots). Bold cap lines top and bottom. Deep violet #9333EA on orchid white #FDF4FF. Flat 2D vector, no gradients, no shadows. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#9333EA", "name": "Time Violet", "role": "Primary brand"}, {"hex": "#FDF4FF", "name": "Orchid White", "role": "App icon background"}, {"hex": "#6B21A8", "name": "Deep Plum", "role": "Text / depth"}, {"hex": "#E9D5FF", "name": "Lavender Mist", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "23", "name": "True North", "appName": "Chein", "tagline": "ချိန်း — Always pointing to the right table.", "logoFn": "LogoCheinCompass", "accentColor": "#15803D", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အိမ်မြှောင် (Compass Rose) စက်ဝိုင်းပုံစံဖြစ်ပြီး မြောက်ဘက်ညွှန် လက်တံနေရာတွင် ခက်ရင်းထိပ်ချွန်း ၃ ချောင်း အထက်သို့ ညွှန်ပြနေကာ တောင်ဘက်တွင် လိုကေးရှင်း အစက် ပါရှိပါသည်။", "rationale": "အိမ်မြှောင်သည် လမ်းကြောင်းမှန်ကို ညွှန်ပြသကဲ့သို့ Chein သည် သုံးစွဲသူအတွက် မှန်ကန်သော စားသောက်ဆိုင်နှင့် ရက်ချိန်းအချိန်ကို တိကျစွာ ညွှန်းပြပေးနိုင်မှုကို ဖော်ပြပါသည်။", "typography": "Navigator Sans — Barlow SemiBold or Archivo Medium. The structured, slightly condensed letterforms feel purposeful and directional. Use DM Mono for coordinates, timestamps, and booking reference numbers. The combination of purposeful sans + monospace mirrors the compass's dual promise: precision (time) + exploration (place).", "prompt": "Minimalist logo for restaurant booking app \"Chein\" (Myanmar: ချိန်း, appointment). A compass rose — clean outer circle, filled center dot. North arm: three fork tines pointing up from center (fork handle = compass needle). South arm: small location-pin circle (hollow circle with filled dot center). East/West arms: dashed lines. Four diagonal ordinal tick marks at NE/NW/SE/SW. Emerald green #15803D on mint white #F0FDF4. Flat 2D vector, no gradients, no shadows, ultra-minimal. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#15803D", "name": "Compass Green", "role": "Primary brand"}, {"hex": "#F0FDF4", "name": "True North Mint", "role": "App icon background"}, {"hex": "#14532D", "name": "Forest Deep", "role": "Text / secondary"}, {"hex": "#86EFAC", "name": "Direction Light", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "24", "name": "Reserved", "appName": "Chein", "tagline": "ချိန်း — Your place is waiting.", "logoFn": "LogoCheinBookmark", "accentColor": "#C2410C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "စာအုပ်မှတ် ဖဲကြိုး (Bookmark Ribbon) ပုံစံဖြစ်ပြီး အောက်ခြေတွင် V-notch အချွန်ပါရှိကာ အတွင်း၌ ခက်ရင်း silhouette နှင့် ဘိုကင် မျဉ်းကြောင်းများ ပါရှိပါသည်။", "rationale": "Bookmark လုပ်ခြင်းသည် 'နေရာယူထားခြင်း/မှတ်သားထားခြင်း' ဖြစ်သကဲ့သို့ ချိန်း (Chein) သည် စားသောက်ဆိုင်တွင် 'နေရာ ဘိုကင်ယူထားခြင်း' ကို ရည်ညွှန်းပါသည်။", "typography": "Heritage Humanist Sans — Lato Bold or Source Sans 3 SemiBold. The warm, legible letterforms complement the bookmark's traditional associations. Pair with Inter Regular for UI copy. Burnt red on white backgrounds achieves excellent contrast for accessibility while maintaining strong brand recall — critical for repeat-use booking apps.", "prompt": "Minimalist logo for restaurant booking app \"Chein\" (Myanmar: ချိန်း, appointment). A classic bookmark shape — tall rectangle with a V-shaped notch at the bottom. Inside: a fork silhouette centered vertically (handle pointing down toward the notch, tines at top). Above the fork tines: two short horizontal lines like a name card or booking reference. A top horizontal rule frames the header of the bookmark. Burnt terracotta #C2410C on parchment white #FFF7ED. Flat 2D vector, no gradients, no fill, pure line art. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#C2410C", "name": "Reserved Red", "role": "Primary brand"}, {"hex": "#FFF7ED", "name": "Parchment White", "role": "App icon background"}, {"hex": "#9A3412", "name": "Deep Terracotta", "role": "Text / depth"}, {"hex": "#FED7AA", "name": "Warm Tan", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "25", "name": "Pulse Dining", "appName": "Chein", "tagline": "ချိန်း — Feel the beat of every reservation.", "logoFn": "LogoCheinPulse", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "နှလုံးခုန်နှုန်း မျဉ်းကြောင်း (ECG Pulse line) ဖြစ်ပြီး အမြင့်ဆုံး ခုနနှုန်း Peaks နေရာတွင် ခက်ရင်းထိပ်ချွန်း ၄ ချောင်း အထက်သို့ မြင့်တက်နေပါသည်။", "rationale": "နှလုံးခုန်လိုင်းသည် 'တက်ကြွဆန်းသစ်မှု' နှင့် 'ရုပ်သိမ်း၍မရသော ရင်ခုန်လှုပ်ရှားမှု' ကို ဖော်ပြပြီး စားသောက်ဖွယ်ရာ ဘိုကင်အတည်ပြုချိန်၏ စိတ်လှုပ်ရှားမှုကို ရည်ညွှန်းပါသည်။", "typography": "Dynamic Geometric Sans — Geist Bold or Inter Bold. The crisp, confident letterforms match the pulse line's energy without competing. Use Inter Mono for real-time booking data — \"3 tables left\", \"Booking confirmed 7:30 PM\" — to reinforce the live, real-time emotional promise. High-contrast crimson CTAs on white deliver urgency that drives conversions.", "prompt": "Minimalist logo for restaurant booking app \"Chein\" (Myanmar: ချိန်း, appointment). A flat ECG / heartbeat pulse line running horizontally — starts flat, rises sharply to a tall peak, drops, smaller second peak, returns flat. At the main tall peak: four short fork tines extend upward from the spike tip. Two small filled circle dots on the flat baseline sections mark booking slots. Crimson rose #E11D48 strokes on heartbeat white #FFF1F2. Flat 2D vector, no gradients, no fills, pure line art. 1024×1024 rounded square app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#E11D48", "name": "Pulse Red", "role": "Primary brand"}, {"hex": "#FFF1F2", "name": "Heartbeat White", "role": "App icon background"}, {"hex": "#9F1239", "name": "Deep Crimson", "role": "Text / depth"}, {"hex": "#FECDD3", "name": "Blush Pink", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "26", "name": "Joyful Plate", "appName": "SarMal", "tagline": "စားမယ် — Pure dining happiness.", "logoFn": "LogoSarMalSmile", "accentColor": "#EA580C", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ SarMal အတွက် အထူးညွှန်းဆိုချက် — 'စားမယ်!' ဟူသော ပျော်ရွှင်တက်ကြွသည့် အခိုက်အတန့်ကို ပြုံးရွှင်နေသော ပန်းကန်ပြား လိုင်းလေးဖြင့် ပေါ်လွင်စေပါသည်။", "visual": "ဝိုင်းစက်သော ပန်းကန်ပြား ပုံစံဖြစ်ပြီး အંદરလိုင်းများက ပြုံးရွှင်နေသော မျက်နှာ ပုံစံကို ဖန်တီးထားကာ အပေါ်တွင် လင်းလက်သော ကြယ်ပွင့် Sparkle ပါရှိပါသည်။", "rationale": "'စားမယ်' (SarMal) သည် အစားအသောက် စားသုံးတော့မည့် ပျော်ရွှင်မှုကို ဖော်ပြခြင်းဖြစ်ရာ ပြုံးရွှင်နေသော ပန်းကန်ပြားသည် စားသုံးသူ၏ စိတ်ကျေနပ်မှုကို အပြည့်အဝ ဖော်ပြပေးပါသည်။", "typography": "Rounded Friendly Sans — Quicksand Bold or Nunito ExtraBold. Soft, expressive letterforms match the smiling plate geometry. Pair with Inter Regular for body copy and reservation details.", "prompt": "Minimalist logo for restaurant app \"SarMal\" (Myanmar: စားမယ်, meaning \"Will Eat!\"). A circular plate outline forming a happy smiling face — arching eyes and a broad smiling mouth line, with a small 4-point sparkle spark above the plate. Vivid sunset orange #EA580C on warm white #FFF8F0 background. Flat 2D vector, no gradients, no shadows, ultra-friendly. 1024×1024 app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#EA580C", "name": "Sunset Orange", "role": "Primary brand"}, {"hex": "#FFF8F0", "name": "Porcelain White", "role": "App icon background"}, {"hex": "#9A3412", "name": "Deep Ochre", "role": "Text / depth"}, {"hex": "#FDBA74", "name": "Warm Peach", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "27", "name": "Chopstick Swirl", "appName": "SarMal", "tagline": "စားမယ် — Ready for the first bite.", "logoFn": "LogoSarMalChopsticks", "accentColor": "#DC2626", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ဒေါင်လိုက် တုတ်ချောင်း (Chopsticks) နှစ်ချောင်းက လှပသော ခေါက်ဆွဲ/အငွေ့လိုင်းကို မမကူမထားပြီး ထိုလိုင်းမှာ 'S' စာလုံးပုံစံ ကွေးညွတ်နေပါသည်။", "rationale": "တုတ်ချောင်းဖြင့် အစားအစာကို မယူခြင်းသည် စားတော့မည့် မီးခိုးအငွေ့ပျံ စားသောက်မှု အခိုက်အတန့်ဖြစ်ပြီး 'S' လိုင်းက SarMal Brand ကို ချက်ချင်း မှတ်မိစေပါသည်။", "typography": "Expressive Modern Sans — Plus Jakarta Sans Bold or Cabinet Grotesk. Dynamic letterforms that feel active and hungry.", "prompt": "Minimalist logo for Asian food app \"SarMal\" (Myanmar: စားမယ်, \"Will Eat!\"). Two diagonal chopsticks lifting a single flowing noodle ribbon that loops into an 'S' curve. Small steam stroke above. Crimson red #DC2626 strokes on pale blush #FEF2F2. Flat 2D vector, no shadows, zero gradients. 1024×1024 app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#DC2626", "name": "Crimson Spice", "role": "Primary brand"}, {"hex": "#FEF2F2", "name": "Blush Canvas", "role": "App icon background"}, {"hex": "#991B1B", "name": "Deep Chili", "role": "Text / depth"}, {"hex": "#FCA5A5", "name": "Steam Coral", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "28", "name": "Golden Bite", "appName": "SarMal", "tagline": "စားမယ် — Irresistible cravings.", "logoFn": "LogoSarMalBite", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ရွှေဝါရောင် ပန်းကန်ပြား စက်ဝိုင်းပုံစံဖြစ်ပြီး ညာဘက်အပေါ်ထောင့်တွင် ကိုက်ထားသော အဝိုက်ရာ (Bite mark) ပါရှိကာ စာအစက်အဖတ်လေးများ လွင့်ပါနေပါသည်။", "rationale": "'စားမယ်' ၏ အစားအသောက်ကို မဆိုင်းမတွ စားချင်စိတ် Craving ကို ကိုက်ထားသော အရာလေးဖြင့် ဖော်ပြထားခြင်းဖြစ်ပြီး စွဲမက်ဖွယ်ရာ Visual Device တစ်ခုဖြစ်ပါသည်။", "typography": "Editorial Display Sans — Outfit Bold or Instrument Sans. Sturdy and appetite-inducing.", "prompt": "Minimalist app icon for food app \"SarMal\" (Myanmar: စားမယ်, \"Will Eat!\"). A circular dinner plate icon with a clean crescent bite cutout on the top-right edge and three small floating crumb dots. Inner dashed concentric ring. Amber gold #D97706 on cream white #FFFBEB. Flat 2D vector, no gradients, clean cutout vector. 1024×1024 app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#D97706", "name": "Golden Honey", "role": "Primary brand"}, {"hex": "#FFFBEB", "name": "Warm Cream", "role": "App icon background"}, {"hex": "#78350F", "name": "Roasted Amber", "role": "Text / depth"}, {"hex": "#FDE68A", "name": "Golden Glow", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "29", "name": "Wok & Flame", "appName": "SarMal", "tagline": "စားမယ် — Fresh off the fire.", "logoFn": "LogoSarMalFlame", "accentColor": "#C2410C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "ဒယ်အိုး (Wok) Silhouette ပုံစံဖြစ်ပြီး ဒယ်အိုးထက်မှ တက်လာသော မီးတောက်သည် ထိပ်တွင် ခက်ရင်းထိပ်ချွန်းများအဖြစ် အသွင်ပြောင်းသွားပါသည်။", "rationale": "ပူပူနွေးနွေး လတ်ဆတ်သော အစားအသောက် 'စားမယ်!' ဟူသော စိတ်ဆန္ဒကို မီးတောက်နှင့် ခက်ရင်း ပေါင်းစပ်မှုဖြင့် ထိရောက်စွာ ဖော်ပြထားပါသည်။", "typography": "Bold Humanist Sans — Source Sans 3 ExtraBold or Barlow Bold.", "prompt": "Minimalist logo for restaurant dining app \"SarMal\" (Myanmar: စားမယ်, \"Will Eat!\"). A wok bowl silhouette with twin side handles, with a central flame rising from the wok that ends in three fork tines. Terracotta orange #C2410C on ivory #FFF7ED. 2D vector, clean lines, no gradients. 1024×1024 app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#C2410C", "name": "Terracotta Fire", "role": "Primary brand"}, {"hex": "#FFF7ED", "name": "Ivory Warmth", "role": "App icon background"}, {"hex": "#7C2D12", "name": "Charcoal Ochre", "role": "Text / depth"}, {"hex": "#FFEDD5", "name": "Flame Haze", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "30", "name": "Feast Crown", "appName": "SarMal", "tagline": "စားမယ် — King of every table.", "logoFn": "LogoSarMalCrown", "accentColor": "#B45309", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "စားသောက်ဖွယ်ရာ ဇလုံအပေါ်တွင် သရဖူ (Crown) ပုံစံ ပါရှိပြီး သရဖူထိပ်ချွန်းများသည် ခက်ရင်းပုံစံဖြစ်ကာ ထိပ်၌ ရွှေရောင် စက်ဝိုင်းရတနာများ ပါရှိပါသည်။", "rationale": "ဘုရင်တစ်ပါးကဲ့သို့ မြိန်ရှက်စွာ စားသောက်ခြင်း 'စားမယ်' ကို သရဖူပန်းကန်ဖြင့် ဖော်ပြပြီး အထူးတလည် စိစစ်ထားသော စားသောက်ဆိုင်များကို ရည်ညွှန်းပါသည်။", "typography": "Luxury Serif / Display — Playfair Display Bold or Cormorant Garamond. Elegant and regal.", "prompt": "Minimalist logo for luxury dining app \"SarMal\" (Myanmar: စားမယ်, \"Will Eat!\"). A crown silhouette resting on a shallow dining bowl, where the three crown peaks double as fork tines with small golden circle jewels on top. Royal gold #B45309 on cream #FFFBEB. Flat 2D vector, no gradients, regal line art. 1024×1024 app icon. Midjourney: --style raw --ar 1:1 --v 6", "palette": [{"hex": "#B45309", "name": "Royal Gold", "role": "Primary brand"}, {"hex": "#FFFBEB", "name": "Cream Velvet", "role": "App icon background"}, {"hex": "#451A03", "name": "Deep Bronze", "role": "Text / depth"}, {"hex": "#FDE68A", "name": "Gold Spark", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "31", "name": "Social Bite", "appName": "ChateMal", "tagline": "Conversation. Cuisine. Negative space magic.", "logoFn": "LogoChateMalSocialBite", "accentColor": "#FF5A36", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အကောင်းဆုံး ရွေးချယ်မှု (Top Pick) — Chat Bubble အလယ်တွင် negative space ဖြင့် ခက်ရင်းပုံစံ ထွင်းထုထားသဖြင့် ခေတ်မီပြီး ဖုန်းစခရင်တွင် ထင်ရှားမှု အရှိဆုံးဖြစ်ပါသည်။", "visual": "ဝိုင်းစက်သော လိမ္မော်ရောင် Chat Bubble ၏ အလယ်တွင် အနုတ်လက္ခဏာ ကွက်လပ် (Negative space) ဖြင့် ခက်ရင်းပုံစံကို ထွင်းထုထားပြီး ခက်ရင်းလက်တံသည် Bubble အမြီးဖြစ်သွားပါသည်။", "rationale": "Chat (စကားပြောခြင်း) နှင့် Meal (စားသောက်ခြင်း) ကို Negative Space ဖြင့် ရှင်းလင်းစွာ ပေါင်းစပ်ထားပြီး Mobile Screen တွင် အလွန်ထင်ရှားလွယ်ကူပါသည်။", "typography": "Friendly Rounded Sans — Nunito or Varela Round. The rounded letterform edges mirror the approachable curves of the speech bubble icon.", "prompt": "A highly minimalist flat vector mobile app icon for a food reservation app. A vibrant orange rounded speech bubble with the silhouette of a minimalist three-pronged fork cut out of the center using negative space. The bottom stem of the fork blends seamlessly into the tail of the speech bubble. Solid white background, simple, clean UI aesthetic, tech-forward, no gradients, no text, vector art, dribbble style.", "palette": [{"hex": "#FF5A36", "name": "Appetite Orange", "role": "Primary brand / CTA"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Negative space / background"}, {"hex": "#C23616", "name": "Burnt Ochre", "role": "Text / depth"}, {"hex": "#FF8A70", "name": "Peach Mist", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "32", "name": "Smiling Cloche", "appName": "ChateMal", "tagline": "Every cover hides a happy meal.", "logoFn": "LogoChateMalSmilingCloche", "accentColor": "#00C98B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Mint Green အရောင် အစားအသောက် အုပ်ဆောင်း (Cloche) လိုင်းပုံစံဖြစ်ပြီး အောက်ခြေအနားလိုင်းသည် အပေါ်သို့ အတန်ငယ်ကွေးသွားကာ ပြုံးရွှင်သော နှုတ်ခမ်းပုံစံ ဖြစ်သွားပါသည်။", "rationale": "အုပ်ဆောင်းဖွင့်လိုက်တိုင်း တွေ့ရမည့် ပျော်ရွှင်ဖွယ် အစားအသောက် ခံစားချက်ကို ပြုံးရွှင်သော အုပ်ဆောင်း လိုင်းလေးဖြင့် ဖော်ပြထားပါသည်။", "typography": "Bold Modern Sans — Poppins or Gilroy with a high x-height. Excellent legibility and a contemporary tech feel.", "prompt": "A minimalist 2D vector logo icon of a restaurant dining cloche food cover. The design is formed by thick, clean, mint-green lines. The handle of the cloche is a single dot, and the bottom rim is curved slightly upward to resemble a subtle, friendly smile. Modern tech app icon style, pure white background, flat design, highly simplified, scalable, no text, corporate identity.", "palette": [{"hex": "#00C98B", "name": "Mint Green", "role": "Primary brand / CTA"}, {"hex": "#1A2B3C", "name": "Charcoal Navy", "role": "Secondary / typography"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "App icon background"}, {"hex": "#A3E6CD", "name": "Soft Mint", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "33", "name": "Orbiting Plate", "appName": "ChateMal", "tagline": "A 360° dining ecosystem.", "logoFn": "LogoChateMalOrbitingPlate", "accentColor": "#4A00E0", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Electric Indigo အရောင် စက်ဝိုင်း ပန်းကန်ပြားကို Neon Pink အရောင် လခြမ်းကွေး 'C' လိုင်းက ဖြတ်သန်းသွားပြီး ထပ်နေသောနေရာတွင် ပွင့်လင်းမြင်သာမှု Transparency ပါရှိပါသည်။", "rationale": "ခေတ်မီဆန်းသစ်သော Food-Tech App တစ်ခုအဖြစ် ဖော်ပြပြီး 360 ဒီဂရီ အပြည့်အဝ ဝန်ဆောင်မှုပေးနိုင်သော C-Orbit စနစ်ကို ဖော်ပြပါသည်။", "typography": "Sleek Extended Sans — Montserrat or Space Grotesk. Wide letterforms give a highly engineered, premium software aesthetic.", "prompt": "A futuristic and minimalist abstract logo for a food tech app. A perfect circle intersected by a sleek crescent shape to form an abstract letter C. Neon indigo and pink color palette with a subtle transparency effect where the shapes overlap. Flat vector, clean edges, isolated on a white background, UI/UX icon style, modern, sleek, no text.", "palette": [{"hex": "#4A00E0", "name": "Electric Indigo", "role": "Primary brand / tech"}, {"hex": "#8E2DE2", "name": "Neon Pink", "role": "Accent / C orbit"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "App icon background"}, {"hex": "#C4B5FD", "name": "Soft Lavender", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "34", "name": "Time-Dine Monogram", "appName": "ChateMal", "tagline": "Your reservation, right on time.", "logoFn": "LogoChateMalTimeDine", "accentColor": "#FFB300", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "အက္ခရာ 'C' စာလုံးသည် နာရီ rim ဖြစ်သွားပြီး အထဲတွင် မတ်မတ် ဓားနှင့် ဇွန်း လက်တံ ၂ ခုက နာရီလက်တံများအဖြစ် ညွှန်ပြနေပါသည်။", "rationale": "ရက်ချိန်း ဘိုကင်ယူခြင်း ၏ အချိန် သဘောတရားနှင့် C (ChateMal) စာလုံးကို ဓား/ဇွန်း နာရီလက်တံများဖြင့် ပါးနပ်စွာ တွဲစပ်ထားခြင်း ဖြစ်ပါသည်။", "typography": "Geometric Heavyweight Sans — Futura Bold or Gotham. Sharp angles and perfect circles match the clock/plate geometry perfectly.", "prompt": "A clever typographic minimalist logo featuring the letter C. The letter C acts as the outer rim of a clock face. Inside the C, the two hands of the clock are creatively stylized as a minimalist geometric knife and spoon. Flat vector, solid mustard yellow and black colors, white background, brilliant graphic design, clever negative space, dribbble, behance, no extra text.", "palette": [{"hex": "#FFB300", "name": "Mustard Yellow", "role": "Primary accent / hands"}, {"hex": "#0F0F0F", "name": "Obsidian Black", "role": "Primary letter C / text"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "App icon background"}, {"hex": "#FFE082", "name": "Warm Amber", "role": "Hover / highlight"}], "creator": "SHL"}, {"id": "35", "name": "Location Bowl", "appName": "ChateMal", "tagline": "Food near you, in one fluid stroke.", "logoFn": "LogoChateMalLocationBowl", "accentColor": "#E52030", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အထူးညွှန်းဆိုချက် — လိုင်းတစ်ခုတည်း (Single line art) ဖြင့် Map Pin နှင့် ဇလုံကို လှပစွာ ပေါင်းစပ်ထားသော Modern line style ဖြစ်ပါသည်။", "visual": "Cherry Red အရောင် လိုင်းတစ်ခုတည်းဖြင့် ရေးဆွဲထားသော Map Location Pin ဖြစ်ပြီး အောက်ခြေသည် ဇလုံ ပန်းကန်လုံးအဖြစ် ကျယ်ပြန့်သွားကာ တုတ်ချောင်း ၂ ချောင်း ပါရှိပါသည်။", "rationale": "အနီးနားရှိ အစားအသောက်များကို တိုက်ရိုက် ရှာဖွေပေးနိုင်သော 'Food near me' သဘောတရားကို လိုင်းတစ်ခုတည်းဖြင့် ရိုးရှင်းစွာ ဖော်ပြထားပါသည်။", "typography": "Structured Condensed Sans — Oswald or DIN. Provides a structured, easily readable anchor to the fluid, organic line art of the icon.", "prompt": "A minimal continuous line-art logo for a local restaurant app. A single fluid cherry-red line that forms the shape of a map location drop-pin, where the bottom half of the pin is shaped like a dining bowl. Two simple straight diagonal lines stick out of the top of the bowl to represent chopsticks. Warm cream background, flat vector illustration, ultra-minimalist, clever branding, clean UI icon, no text.", "palette": [{"hex": "#E52030", "name": "Cherry Red", "role": "Primary brand / line art"}, {"hex": "#F9F7F1", "name": "Warm Cream", "role": "App icon background"}, {"hex": "#991B1B", "name": "Deep Crimson", "role": "Text / depth"}, {"hex": "#FCA5A5", "name": "Soft Coral", "role": "Hover / secondary"}], "creator": "SHL"}, {"id": "36", "name": "The Dining Marker", "appName": "ChateMal", "tagline": "Dining Location & Smart Booking", "logoFn": "LogoChateMalDiningMarker", "accentColor": "#FF5733", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Map location drop-pin ပုံသဏ္ဌာန်အလယ်တွင် စားသောက်ဆိုင် ဇွန်းခက် (Fork) ၏ အလယ်လက်တံနှင့် ပင်စည်ကို ချောမွေ့စွာ ပေါင်းစပ်ထားသော minimalist single-color vector mark ဖြစ်ပါသည်။", "rationale": "Map Pin သည် စားသောက်ဆိုင် တည်နေရာကို ညွှန်ပြပြီး Fork ဇွန်းခက်သည် အစားအသောက် သုံးဆောင်ခြင်းကို ကိုယ်စားပြုပါသည်။ ChateMal App မှတစ်ဆင့် အနီးနားရှိ စားသောက်ဆိုင်များကို လွယ်ကူမြန်ဆန်စွာ ရှာဖွေဘိုကင်ယူနိုင်ကြောင်း သက်သေပြသော ရိုးရှင်းဆန်းသစ်သည့် ဒီဇိုင်းဖြစ်ပါသည်။", "typography": "Clean Geometric Sans-serif (e.g., Montserrat or Poppins), bold weight, all caps, or sentence case with rounded terminals to feel approachable yet modern.", "prompt": "A clean, minimal photo of a single, modern mobile app icon on a smartphone screen. The icon is a vibrant coral pink square with rounded corners. Inside, a clean, single-color white vector mark of an integrated map location pin and a minimalist fork is displayed. The map pin shape forms the base, and its inner space seamlessly transforms into a single simplified tine fork pointing upwards. The background is a gently blurred scene of a light-filled modern city. The overall aesthetic is extremely clean, tech-forward, and uncluttered.", "palette": [{"hex": "#FF5733", "name": "Energetic Coral", "role": "Primary brand / pin mark"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Fork tine & vector fill"}, {"hex": "#FFF5F2", "name": "Soft Coral Tint", "role": "App icon background"}, {"hex": "#C0392B", "name": "Deep Coral Red", "role": "Text & contrast accent"}], "creator": "SHL"}, {"id": "37", "name": "The Taste Dialogue", "appName": "ChateMal", "tagline": "Connecting Reviews & Dining", "logoFn": "LogoChateMalTasteDialogue", "accentColor": "#4A90E2", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Sky Blue အရောင် အဝိုင်းပန်းကန်လုံးနှင့် Sunshine Yellow အရောင် စကားပြော Speech Bubble တို့ ဆုံတွေ့ယှက်နွယ်နေပြီး အလယ်တွင် 'C' အက္ခရာ လိုင်းနှင့် Negative space fork ပုံရိပ် ပေါ်ထွက်နေပါသည်။", "rationale": "ChateMal ၏ စကားပြောဆိုခြင်း (Chat / Review) နှင့် အစားအသောက် သုံးဆောင်ခြင်း (Plate / Meal) ကို တစ်ဆက်တည်း ပေါင်းစည်းပေးထားပါသည်။ သုံးစွဲသူများအကြား အစားအသောက် အတွေ့အကြုံများ ဝေမျှခြင်းနှင့် စားသောက်ဆိုင် ဘိုကင်ယူခြင်းတို့ကို ရင်းနှီးဖော်ရွေသော Geometry ပုံစံဖြင့် ရေးဆွဲထားပါသည်။", "typography": "Modern, clean sans-serif (e.g., Lato or Lato Rounded) with rounded terminals, moderate weight, and clear spacing.", "prompt": "A clean, flat lay photograph of a modern presentation slide. At the center, a highly minimalist and clean app icon on a white surface. The icon has an interconnected form made of rounded geometric shapes. A Sky Blue circle (plate) overlaps with a Sunshine Yellow speech bubble. A continuous white line traces a stylized letter 'C' within them, and the negative space subtly forms a fork shape where they join. Below the icon, the name \"ChateMal\" is in a clean, modern sans-serif font. The background is a clean light gray. The aesthetic is extremely minimalist and tech-forward.", "palette": [{"hex": "#4A90E2", "name": "Sky Blue", "role": "Primary plate / C stroke"}, {"hex": "#F5A623", "name": "Sunshine Yellow", "role": "Secondary chat bubble"}, {"hex": "#F0F7FF", "name": "Soft Ice Tint", "role": "App icon background"}, {"hex": "#1E3A8A", "name": "Navy Blue", "role": "Typography & depth"}], "creator": "SHL"}, {"id": "38", "name": "The ChateMal Gourmet", "appName": "ChateMal", "tagline": "Friendly Digital Gourmet Assistant", "logoFn": "LogoChateMalGourmet", "accentColor": "#DC143C", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အထူးညွှန်းဆိုချက် — ဖော်ရွေသော Mascot Character ပုံရိပ်ဖြင့် စားသောက်ဆိုင် ပန်းကန်အုပ်ဆိုင်း (Bell Cloche) နှင့် ဓား/ဇွန်း အင်တာနာများကို ချစ်စဖွယ် ပေါင်းစပ်ထားသော Brand Companion ဖြစ်ပါသည်။", "visual": "စားသောက်ဆိုင် ပန်းကန်အုပ်ဆိုင်း (Bell Cloche) ဦးထုပ် ဆောင်းထားပြီး အပေါ်တွင် ဓားနှင့်ဇွန်း အင်တာနာ ၂ ချောင်းပါသော ချစ်စဖွယ် မျက်နှာပြုံး Character မာ့ခ် ဖြစ်ပါသည်။", "rationale": "ဖော်ရွေသော Mascot Character သည် လူတိုင်း အသုံးပြုရလွယ်ကူသော သဘောတရားကို ဖန်တီးပေးပါသည်။ Bell Cloche ဖြင့် စားသောက်ဆိုင် ဝန်ဆောင်မှုကို ဖော်ပြပြီး ဓား/ဇွန်း အင်တာနာများက Digital Dining Helper အဖြစ် ဆွဲဆောင်မှုရှိစွာ ဖော်ပြထားပါသည်။", "typography": "Rounded bold sans-serif (e.g., Quicksand or Varela Round) for a soft, playful, and approachable feel that matches the character.", "prompt": "A macro photograph of a clean, single mobile app icon on a modern wooden desk. The icon is a glossy Happy Crimson rounded square. Inside, a minimalist white vector graphic of a stylized, friendly character with a bell cloche head and antennae that are also a simplified fork and knife. Simple eyes and a smile are on its face. The style is extremely clean, bold, and modern, with a slightly playful feel. Subtle soft light falls on the icon. The background is a gently blurred modern cafe environment.", "palette": [{"hex": "#DC143C", "name": "Happy Crimson", "role": "Primary brand character mark"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Character inner fill"}, {"hex": "#FFF0F3", "name": "Soft Crimson Tint", "role": "App icon background"}, {"hex": "#8B0000", "name": "Deep Burgundy", "role": "Typography & contrast"}], "creator": "SHL"}, {"id": "39", "name": "The Seamless Journey", "appName": "ChateMal", "tagline": "Effortless Reservation & Booking Success", "logoFn": "LogoChateMalSeamlessJourney", "accentColor": "#00CED1", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Digital Teal နှင့် Electric Blue Gradient လိုင်းတစ်ခုတည်းမှ lowercase 'c' အက္ခရာကို စတင်ဖန်တီးပြီး အထက်သို့ ညွှန်ပြနေသော Checkmark သို့ ချောမွေ့စွာ ကူးပြောင်းသွားသည့် dynamic vector mark ဖြစ်ပါသည်။", "rationale": "ဆက်တိုက် စီးဆင်းနေသော Fluid line သည် ဘိုကင်တင်ခြင်း လုပ်ငန်းစဉ်တစ်ခုလုံး၏ ချောမွေ့လွယ်ကူမှုကို ကိုယ်စားပြုပြီး၊ အဆုံးသတ်ရှိ Checkmark သည် အောင်မြင်စွာ စားသောက်ဆိုင် ဘိုကင်ရရှိခြင်း (Booking Success) ကို ဖော်ပြပါသည်။", "typography": "Clean, geometric sans-serif (e.g., Open Sans or Roboto), moderate weight, simple, and legible for a direct and efficient brand image.", "prompt": "A clean photograph of a mobile phone screen displaying a single app icon in a dark mode interface. The icon is a rounded square with a smooth gradient from Digital Teal to Electric Blue. Inside, a single, fluid, continuous white line vector mark flows through an interlocking lowercase 'c' shape, culminating in an upward-pointing checkmark. The lines are extremely clean, simple, and modern. Subtle light rays emanate from the checkmark. The background is a gently blurred, high-tech city at night. The aesthetic is minimal, tech-forward, and efficient.", "palette": [{"hex": "#00CED1", "name": "Digital Teal", "role": "Gradient start / fresh tech"}, {"hex": "#007BFF", "name": "Electric Blue", "role": "Gradient end / trust"}, {"hex": "#F0FDFD", "name": "Soft Cyan Tint", "role": "App icon background"}, {"hex": "#005F73", "name": "Deep Cyan", "role": "Typography & border"}], "creator": "SHL"}, {"id": "40", "name": "The Dining Whisper", "appName": "ChateMal", "tagline": "Clever Negative Space Dining Dialogue", "logoFn": "LogoChateMalDiningWhisper", "accentColor": "#228B22", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အထူးညွှန်းဆိုချက် — negative space နည်းပညာဖြင့် စကားပြော Speech Bubble ထဲတွင် ဇွန်းခက် (Fork tines) ပုံရိပ်ကို အလွန်ဆန်းသစ်စွာ ထွင်းထုထားသော Clever minimalist logo ဖြစ်ပါသည်။", "visual": "Forest Emerald အရောင် စကားပြော Speech Bubble ၏ အလယ်ဗဟို Negative Space တွင် အထက်သို့ ညွှန်ပြနေသော ဇွန်းခက် (Fork tines) ပုံရိပ်ကို အလွန်သပ်ရပ်စွာ ထွင်းထုထားခြင်း ဖြစ်ပါသည်။", "rationale": "Chate (စကားပြော/သုံးသပ်ချက်) နှင့် Meal (အစားအသောက်) ကို ပါးနပ်သော Negative space နည်းပညာဖြင့် ပေါင်းစပ်ထားသဖြင့် မြင်သူတိုင်း စိတ်ဝင်စားမှတ်မိလွယ်သော တီထွင်ဖန်တီးမှု ဖြစ်ပါသည်။", "typography": "Modern, clean, well-spaced sans-serif (e.g., Avenir Next or Poppins), sentence case, with clear, direct letterforms for a professional and contemporary look.", "prompt": "A macro photograph of a single mobile app icon on a textured white surface. The icon is a clean, modern Forest Emerald green square with rounded corners. Inside, a highly minimalist and precise white vector graphic of a single conversation bubble. Within the negative space of the bubble, the clear tines of a stylized fork are formed, pointing upwards, with a minimal handle line. The lines are extremely clean, smooth, and minimalist. Soft, even studio lighting. The background is a clean, slightly blurred minimalist desk with a plant. The style is extremely clean and tech-forward.", "palette": [{"hex": "#228B22", "name": "Forest Emerald", "role": "Primary speech bubble"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Negative space fork tines"}, {"hex": "#F0FFF0", "name": "Soft Mint Tint", "role": "App icon background"}, {"hex": "#004D40", "name": "Deep Forest", "role": "Typography & accent"}], "creator": "SHL"}, {"id": "41", "name": "The Dining Network", "appName": "ChateMal", "tagline": "Social Table Sync & Group Booking", "logoFn": "LogoChateMalDiningNetwork", "accentColor": "#6366F1", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Indigo Glow အရောင် ကြိဂံ ပန်းကန်ပြားသဏ္ဌာန် ထောင့် ၃ ခုတွင် Node သုံးခု ချိတ်ဆက်ထားပြီး အလယ်ဗဟိုတွင် လင်းလက်နေသော Glowing Core ပါရှိသော Tech-forward Mark ဖြစ်ပါသည်။", "rationale": "ChateMal ၏ မိတ်ဆွေများအကြား အဖွဲ့လိုက် စားသောက်ဆိုင် ဘိုကင်ညှိနှိုင်းခြင်း (Group Dining Sync) နှင့် လူမှုကွန်ရက်သဘောတရားကို Modern Node Network အဖြစ် ရေးဆွဲထားခြင်း ဖြစ်ပါသည်။", "typography": "Clean Tech Sans — Inter or Space Grotesk. Futuristic and structured.", "prompt": "A tech-forward minimalist app icon on a white background. Inside, an Indigo Glow triangular network mark with 3 rounded node endpoints connected by clean lines, with a glowing central core circle representing social dining sync. Modern software branding, dribbble style.", "palette": [{"hex": "#6366F1", "name": "Indigo Glow", "role": "Primary node network"}, {"hex": "#4F46E5", "name": "Deep Indigo", "role": "Central glowing core"}, {"hex": "#EEF2FF", "name": "Soft Lavender Tint", "role": "App icon background"}, {"hex": "#312E81", "name": "Dark Navy", "role": "Typography & contrast"}], "creator": "SHL"}, {"id": "42", "name": "The Table Speech Monogram", "appName": "ChateMal", "tagline": "Conversation at Every Table", "logoFn": "LogoChateMalTableSpeech", "accentColor": "#EC4899", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Social Pink အရောင် 'C' အက္ခရာသည် အလယ်ရှိ အဝိုင်း စားပွဲပြင်သို့ ခေါက်ဝင်သွားပြီး ပတ်လည်တွင် စကားပြော Speech Bubble ပုံသဏ္ဌာန် ထိုင်ခုံများ ရံခြုံထားသော Monogram ဖြစ်ပါသည်။", "rationale": "ChateMal စကားလုံးမှ 'C' အက္ခရာကို အစားသောက် စားပွဲဝိုင်း (Round Table) နှင့် စကားပြောဆိုခြင်း (Chat Bubble Chairs) တို့ဖြင့် ပါးနပ်စွာ အနုပညာမြောက် ပေါင်းစပ်ထားပါသည်။", "typography": "Rounded Modern Monogram Sans — Outfit or Plus Jakarta Sans. Soft, inviting and curved.", "prompt": "A sleek vector monogram app icon featuring the letter C seamlessly morphing into an overhead aerial view of a round dining table surrounded by speech bubble chairs. Social pink and magenta palette, soft light background, flat design.", "palette": [{"hex": "#EC4899", "name": "Social Pink", "role": "Primary letter C & table rim"}, {"hex": "#DB2777", "name": "Vibrant Magenta", "role": "Speech bubble seats"}, {"hex": "#FDF2F8", "name": "Soft Rose Tint", "role": "App icon background"}, {"hex": "#831843", "name": "Deep Rose", "role": "Typography accent"}], "creator": "SHL"}, {"id": "43", "name": "The Tasting Badge", "appName": "ChateMal", "tagline": "Exclusive Social Dining Club", "logoFn": "LogoChateMalTastingBadge", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Heritage Amber အရောင် တံဆိပ်ခေါင်း (Wax Stamp Badge) သဏ္ဌာန်အလယ်တွင် ပြောင်းပြန် ဇွန်းခက် (Fork) နှင့် Ribbon tail စကားပြော Tag တို့ ပါရှိသော Premium Club Stamp ဖြစ်ပါသည်။", "rationale": "အထူး သီးသန့် စားသောက်ဆိုင် ဘိုကင်များနှင့် လူမှုကွန်ရက် Review များ၏ အဆင့်အတန်းမြင့်မားမှု (Premium Stamp of Quality) ကို ဖော်ညွှန်းထားသော ဒီဇိုင်းဖြစ်ပါသည်။", "typography": "Serif & Sans Hybrid — Playfair Display / DM Mono. Premium gourmet club aesthetic.", "prompt": "A premium wax stamp style minimalist app icon. Golden amber color badge featuring a ribbon tail tag combined with an inverted fork vector outline. High-end dining club stamp, flat vector, luxury, clean line art.", "palette": [{"hex": "#D97706", "name": "Heritage Amber", "role": "Primary stamp badge border"}, {"hex": "#F59E0B", "name": "Golden Amber", "role": "Ribbon tail & inner dash"}, {"hex": "#FFFBEB", "name": "Warm Cream Tint", "role": "App icon background"}, {"hex": "#78350F", "name": "Deep Amber Brown", "role": "Typography & shadow"}], "creator": "SHL"}, {"id": "44", "name": "The Soundwave Feast", "appName": "ChateMal", "tagline": "Voice Chat & Dining Harmonized", "logoFn": "LogoChateMalSoundwaveFeast", "accentColor": "#8B5CF6", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Vibrant Purple အရောင် အသံလှိုင်း Equalizer Bars (၅) ချောင်းပါဝင်ပြီး အလယ်လိုင်း (၃) ချောင်းသည် အထက်သို့ ကာကားထွက်သွားကာ ဇွန်းခက် (Fork Head) ပုံစံ ဖြစ်ပေါ်နေပါသည်။", "rationale": "Chate (အသံဖြင့် စကားပြောဆိုခြင်း/ဆွေးနွေးခြင်း) ၏ အသံလှိုင်း (Soundwave) များနှင့် Meal (အစားအသောက်) ၏ ဇွန်းခက်ပုံရိပ်ကို တစ်ပြိုင်နက်တည်း ပေါင်းစပ်ထားသော ဆန်းသစ်သည့် ခေတ်မီ တီထွင်မှုဖြစ်ပါသည်။", "typography": "Modern Audio Tech Sans — Montserrat or Space Grotesk. Equalizer symmetry matches type cleanly.", "prompt": "An innovative audio-tech dining app icon. Modern vibrant purple soundwave equalizer bars arranged vertically, where the middle three bars curve to form the tines of a minimalist fork. Flat vector art, soft background, ultra modern UI icon.", "palette": [{"hex": "#8B5CF6", "name": "Vibrant Purple", "role": "Primary soundwave bars"}, {"hex": "#7C3AED", "name": "Deep Violet", "role": "Fork center tine & base"}, {"hex": "#F5F3FF", "name": "Soft Violet Tint", "role": "App icon background"}, {"hex": "#C4B5FD", "name": "Light Purple", "role": "Outer equalizer bars"}], "creator": "SHL"}, {"id": "45", "name": "The Infinite Table", "appName": "ChateMal", "tagline": "Endless Dining Conversations", "logoFn": "LogoChateMalInfiniteTable", "accentColor": "#06B6D4", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ ChateMal အတွက် အထူးညွှန်းဆိုချက် — မဟာဗျူဟာမြောက် Infinity Loop (∞) ဖြင့် ပန်းကန်ပြားနှင့် စကားပြော Speech Bubble တို့ကို အစအဆုံးမရှိ ချိတ်ဆက်ထားသော World-class Minimalist Brand Identity ဖြစ်ပါသည်။", "visual": "", "rationale": "အဆုံးမရှိသော အစားအသောက် အတွေ့အကြုံများနှင့် စကားပြောဆိုမှုများကို Infinity symbol ဖြင့် ပေါင်းစပ်ထားသဖြင့် ChateMal ၏ ရည်ရွယ်ချက်ကို အထိရောက်ဆုံး ဖော်ပြပေးပါသည်။", "typography": "Sleek Modern Sans — Inter or Avenir. Clean, geometric and infinitely balanced.", "prompt": "A brilliant infinity symbol minimalist app icon for a dining app. Cyan blue infinity loop where one loop morphs into a dining plate with dashed inner ring and the other loop morphs into a speech bubble tail. Flat vector, clean background, icon design.", "palette": [{"hex": "#06B6D4", "name": "Cyan Blue", "role": "Primary infinity stroke"}, {"hex": "#0891B2", "name": "Deep Cyan", "role": "Plate dashed inner ring"}, {"hex": "#ECFEFF", "name": "Soft Cyan Tint", "role": "App icon background"}, {"hex": "#164E63", "name": "Dark Teal", "role": "Typography & contrast"}], "creator": "SHL"}, {"id": "46", "name": "The Culinary Flame", "appName": "SarMal", "tagline": "Sizzling Cravings & Fresh Hot Meals", "logoFn": "LogoSarMalCulinaryFlame", "accentColor": "#FF4500", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Flame Orange-Red အရောင် မီးတောက်သင်္ကေတ မီးလျှံ ၃ ခုသည် အထက်သို့ ဝလွှာစွာ တက်သွားပြီး အောက်ခြေတွင် ပြုံးနေသော ပါးစပ် (Smiling Mouth) ပုံသဏ္ဌာန် ဖြစ်ပေါ်နေပါသည်။", "rationale": "SarMal (စားမယ်!) ၏ အရသာရှိလှသော အစားအသောက်သစ်များ (Sizzling Hot Food) နှင့် စားသုံးလိုသည့် ရွှင်လန်းသော စိတ်ဆန္ဒ (Appetite Smile) တို့ကို မီးလျှံ ပုံရိပ်ဖြင့် သက်ဝင်လှုပ်ရှားစွာ ရေးဆွဲထားပါသည်။", "typography": "Bold Expressive Sans — Poppins Bold or Cabinet Grotesk. Energetic and appetite-stimulating.", "prompt": "An appetizing culinary flame minimalist app icon. Vibrant flame orange-red 3-point fire flame graphic whose bottom curve subtly forms a happy smiling mouth. Warm light background, high energy dining brand mark.", "palette": [{"hex": "#FF4500", "name": "Flame Orange-Red", "role": "Primary culinary flame"}, {"hex": "#FFD700", "name": "Golden Spark", "role": "Inner flame accent"}, {"hex": "#FFF5F0", "name": "Warm Flame Tint", "role": "App icon background"}, {"hex": "#9A031E", "name": "Deep Crimson", "role": "Typography contrast"}], "creator": "SHL"}, {"id": "47", "name": "The Golden Bite Monogram", "appName": "SarMal", "tagline": "Irresistible Cravings, One Bite Away", "logoFn": "LogoSarMalGoldenBite", "accentColor": "#EAB308", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Golden Harvest အရောင် ဖွံ့ထွားသော 'S' အက္ခရာ၏ အထက်ဘက် ကွေးညွှတ်မှုတွင် ကိုက်ထားသော ကိုက်ရာ (Crescent Bite Mark) ကို အလွန်ဆန်းသစ်စွာ ထွင်းထုထားသော Monogram ဖြစ်ပါသည်။", "rationale": "SarMal ၏ စာလုံးဦး 'S' ကို အလွန် မစားဘဲ မနေနိုင်အောင် ဆွဲဆောင်မှုရှိသော Bite Mark ဖြင့် ဖန်တီးထားသဖြင့် အစားအသောက် အမှတ်တံဆိပ်အဖြစ် မှတ်မိလွယ်မှု မြင့်မားပါသည်။", "typography": "Heavyweight Monogram Sans — Futura Bold or Syne. Bold impact with bite-mark geometry.", "prompt": "A clever typographic monogram app icon featuring a thick Golden Harvest yellow letter S. The top curve of the S has a clean crescent bite mark taken out of it with tiny crumbs. Flat vector, clean yellow background, dribbble design.", "palette": [{"hex": "#EAB308", "name": "Golden Harvest", "role": "Primary letter S monogram"}, {"hex": "#CA8A04", "name": "Dark Gold", "role": "Bite crumbs & detail"}, {"hex": "#FEFCE8", "name": "Cream Yellow Tint", "role": "App icon background"}, {"hex": "#713F12", "name": "Deep Bronze", "role": "Typography"}], "creator": "SHL"}, {"id": "48", "name": "The Chef's Smile", "appName": "SarMal", "tagline": "Culinary Excellence Meets Pure Joy", "logoFn": "LogoSarMalChefSmile", "accentColor": "#EF4444", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ SarMal အတွက် အထူးညွှန်းဆိုချက် — စဖိုမှူး ဦးထုပ် (Chef Toque) ကို ပြောင်းပြန်လှန်၍ ဇာတ်ကွက်ဆင်ထားပြီး အောက်ခြေ rim တွင် တုတ်ချောင်း (Chopsticks) ကို ကိုက်ထားသည့် မျက်နှာပြုံး ပုံရိပ်အဖြစ် ဖန်တီးထားသော Top Class Gourmet Icon ဖြစ်ပါသည်။", "visual": "Feast Red အရောင် စဖိုမှူး ဦးထုပ် (Chef Toque) ကို ပြောင်းပြန် ပြုလုပ်ထားပြီး အောက်ခြေ ရင်းနှီးသော အပြုံးစက်ဝိုင်းက တုတ်ချောင်း ၂ ချောင်းကို ကိုက်ထားသည့် ပုံရိပ် ဖြစ်ပါသည်။", "rationale": "စဖိုမှူး၏ အချက်အပြုတ် ကျွမ်းကျင်မှု (Chef Toque) နှင့် စားသုံးသူ၏ ပျော်ရွှင်မှု (Smile & Chopsticks) တို့ကို တစ်ပြိုင်နက်တည်း ဖော်ပြပေးထားပါသည်။", "typography": "Playful Rounded Sans — Quicksand or Varela Round. Warm, friendly and approachable.", "prompt": "A brilliant chef toque hat minimalist app icon. The outline of a chef hat is inverted, and its lower band forms a wide smiling mouth holding a pair of chopsticks. Feast red line art, soft background, food app identity.", "palette": [{"hex": "#EF4444", "name": "Feast Red", "role": "Primary chef toque outline"}, {"hex": "#DC2626", "name": "Crimson Red", "role": "Smile rim & chopsticks"}, {"hex": "#FEF2F2", "name": "Soft Red Tint", "role": "App icon background"}, {"hex": "#7F1D1D", "name": "Dark Red", "role": "Typography"}], "creator": "SHL"}, {"id": "49", "name": "The Origami Bowl", "appName": "SarMal", "tagline": "Modern Geometric Precision Dining", "logoFn": "LogoSarMalOrigamiBowl", "accentColor": "#10B981", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Fresh Emerald အရောင် 3D ရေနွေးကြမ်း/ခေါက်ဆွဲ ဇလုံကို Geometric Faceted Origami လိုင်းများဖြင့် တိကျစွာ ရေးဆွဲထားပြီး အထက်တွင် အငွေ့လိုင်း ၃ လိုင်း တက်နေပါသည်။", "rationale": "အဆင့်မြင့် ခေတ်မီ ဆန်းသစ်သော Modern Gastronomy စားသောက်ဆိုင်များကို နှစ်သက်သည့် လူငယ်များအတွက် တိကျသပ်ရပ်သော 3D Origami Geometry ဖြင့် ရေးဆွဲထားခြင်း ဖြစ်ပါသည်။", "typography": "Architectural Tech Sans — Space Grotesk or Outfit. Sharp geometric facets align with origami artwork.", "prompt": "A precision origami geometric ramen bowl minimalist app icon. Clean fresh emerald green faceted line art forming a 3D folded paper bowl with three stylized steam lines rising. Modern architectural tech food icon.", "palette": [{"hex": "#10B981", "name": "Fresh Emerald", "role": "Primary origami bowl geometry"}, {"hex": "#059669", "name": "Deep Emerald", "role": "Steam lines & inner facet"}, {"hex": "#ECFDF5", "name": "Soft Emerald Tint", "role": "App icon background"}, {"hex": "#064E3B", "name": "Dark Mint", "role": "Typography"}], "creator": "SHL"}, {"id": "50", "name": "The Flavor Burst", "appName": "SarMal", "tagline": "Exploding Taste in Every Dish", "logoFn": "LogoSarMalFlavorBurst", "accentColor": "#F97316", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Vivid Amber အရောင် ဗဟို ပန်းကန်ပြားမှ အရပ် ၈ မျက်နှာသို့ မီးရှူးမီးပန်းများကဲ့သို့ Radial Rays (၈) ချောင်း ဖြာထွက်နေပြီး အဖျားတွင် ဇွန်း/ဓား အစက်လေးများ ပါရှိပါသည်။", "rationale": "SarMal (စားမယ်!) ၏ စိတ်လှုပ်ရှားဖွယ် အရသာ ပေါက်ကွဲမှု (Flavor Burst / Starburst) ကို ပန်းကန်ပြား ဗဟိုပြု၍ နေရောင်ခြည်ကဲ့သို့ အားအင်ပြည့်ဝစွာ ဖော်ပြထားပါသည်။", "typography": "Bold Impact Sans — Cabinet Grotesk or Oswald. Dynamic energy radiating outward.", "prompt": "A vibrant flavor burst minimalist app icon. A central dining plate with 8 radial starburst rays extending outward, each ray tipped with a tiny utensil dot motif. Vivid orange and amber color palette, clean modern UI mark.", "palette": [{"hex": "#F97316", "name": "Vivid Amber", "role": "Primary starburst plate"}, {"hex": "#EA580C", "name": "Deep Orange", "role": "Radial ray lines"}, {"hex": "#FFF7ED", "name": "Soft Amber Tint", "role": "App icon background"}, {"hex": "#7C2D12", "name": "Dark Amber", "role": "Typography"}], "creator": "SHL"}, {"id": "51", "name": "The Precision Hourglass", "appName": "Chein", "tagline": "Perfect Booking Timing, Always", "logoFn": "LogoCheinPrecisionHourglass", "accentColor": "#2563EB", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Royal Blue အရောင် သဲနာရီ (Hourglass) သဏ္ဌာန် ကြိဂံ ၂ ခု ဆုံတွေ့ထားပြီး အထက်ကြိဂံတွင် ဇွန်းခက် (Fork) နှင့် အောက်ကြိဂံတွင် တည်နေရာ Pin (Location Pin) တို့ ပါရှိပါသည်။", "rationale": "Chein (ချိန်း) ၏ ရက်ချိန်း အချိန်ဇယား (Time / Hourglass) နှင့် စားသောက်ဆိုင် ဘိုကင် (Fork & Map Pin) ကို အချိန်တိကျမှု သင်္ကေတအဖြစ် ပေါင်းစပ်ထားပါသည်။", "typography": "Structured Monospace Sans — DM Mono or Space Mono. Expressing time precision and scheduling.", "prompt": "A minimalist hourglass booking app icon. Royal blue line art of two inverted triangles forming an hourglass shape, with a fork in the top chamber and a location drop pin in the bottom chamber. Clean geometry, white/blue background.", "palette": [{"hex": "#2563EB", "name": "Royal Blue", "role": "Primary hourglass geometry"}, {"hex": "#1D4ED8", "name": "Deep Blue", "role": "Fork & location pin elements"}, {"hex": "#EFF6FF", "name": "Soft Blue Tint", "role": "App icon background"}, {"hex": "#1E3A8A", "name": "Navy Blue", "role": "Typography"}], "creator": "SHL"}, {"id": "52", "name": "The Calendar Table", "appName": "Chein", "tagline": "Reserve Your Dining Date", "logoFn": "LogoCheinCalendarGrid", "accentColor": "#0D9488", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein အတွက် အထူးညွှန်းဆိုချက် — ပြက္ခဒိန် (Calendar Grid) ၏ အလယ်ဗဟို ရက်စွဲကွက်ကို အဝိုင်း ပန်းကန်ပြားနှင့် Checkmark အဖြစ် ညွှန်ပြထားသော မဟာဗျူဟာမြောက် Schedule Booking Mark ဖြစ်ပါသည်။", "visual": "Teal Slate အရောင် ပြက္ခဒိန် (3x3 Calendar Grid) ၏ အလယ်ဗဟို Cell ကွက်သည် အဝိုင်း ပန်းကန်ပြား ဖြစ်သွားပြီး အထဲတွင် အောင်မြင်သော Checkmark ပါရှိပါသည်။", "rationale": "ရက်ချိန်းယူခြင်း (Chein) ၏ Calendar သဘောတရားနှင့် စားသောက်ဆိုင် စားပွဲ ဘိုကင်အောင်မြင်ခြင်း (Plate Checkmark) ကို အရှင်းလင်းဆုံး ဖော်ပြထားသော ဒီဇိုင်းဖြစ်ပါသည်။", "typography": "Clean Modern Sans — Inter or Plus Jakarta Sans. Structured calendar precision readability.", "prompt": "A clever calendar dining app icon. A Teal Slate 3x3 calendar grid frame where the central date cell is highlighted as a round dining plate with a white checkmark inside. Schedule booking concept, clean flat vector.", "palette": [{"hex": "#0D9488", "name": "Teal Slate", "role": "Primary calendar frame & plate"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Checkmark inside plate"}, {"hex": "#F0FDFA", "name": "Soft Teal Tint", "role": "App icon background"}, {"hex": "#115E59", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "53", "name": "The Lock & Dine Monogram", "appName": "Chein", "tagline": "Secured Table Reservation Guarantee", "logoFn": "LogoCheinLockDine", "accentColor": "#4F46E5", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Indigo Trust အရောင် သော့ခတ် (Padlock Shackle) ကွေးသည် 'C' အက္ခရာအဖြစ် ပြုလုပ်ထားပြီး သော့ပေါက် (Keyhole) ကို တည်နေရာ Pin သဏ္ဌာန် ဖန်တီးထားပါသည်။", "rationale": "Chein ၏ 'C' စာလုံးကို စားသောက်ဆိုင် စားပွဲ သေချာပေါက် ရရှိရေး (Secured & Locked Table Reservation) သဘောတရားအဖြစ် Padlock & Pin ပုံရိပ်ဖြင့် ရေးဆွဲထားခြင်း ဖြစ်ပါသည်။", "typography": "Heavyweight Monogram Sans — Outfit Bold or Futura. Strong security and table confirmation.", "prompt": "A clever padlock monogram app icon for table booking. Indigo blue padlock shackle forming the letter C, with a white table location pin keyhole inside the lock body. Secured reservation concept, flat vector identity.", "palette": [{"hex": "#4F46E5", "name": "Indigo Trust", "role": "Primary lock shackle & C monogram"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Keyhole pin mark"}, {"hex": "#EEF2FF", "name": "Soft Indigo Tint", "role": "App icon background"}, {"hex": "#312E81", "name": "Dark Navy", "role": "Typography"}], "creator": "SHL"}, {"id": "54", "name": "The Compass Plate", "appName": "Chein", "tagline": "Navigate to Your Scheduled Meal", "logoFn": "LogoCheinCompassPlate", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Sky Slate အရောင် အဝိုင်း အိမ်မြှောင် (Compass Rose) ၏ မြောက်ဘက် အိမ်မြှောင်လက်တံသည် ဇွန်းခက် (Fork) ဖြစ်ပြီး အရှေ့ဘက် လက်တံသည် Location Pin ဖြစ်ပါသည်။", "rationale": "ရက်ချိန်းယူထားသော စားသောက်ဆိုင်သို့ အချိန်မီ သွားရောက်နိုင်ရေး (Navigation & Time Scheduling) ကို အိမ်မြှောင် ပန်းကန်ပြား လက္ခဏာဖြင့် ပါးနပ်စွာ ဖော်ပြထားပါသည်။", "typography": "Precision Technical Sans — Space Grotesk or DM Mono. Directional navigation alignment.", "prompt": "A compass rose dining app icon. Sky blue circular compass dial where the North needle point is shaped like a minimalist fork tine and the East point is a drop pin. Navigation and table appointment concept, flat vector icon.", "palette": [{"hex": "#0284C7", "name": "Sky Slate", "role": "Primary compass ring & needles"}, {"hex": "#38BDF8", "name": "Light Sky Blue", "role": "Secondary compass needles"}, {"hex": "#F0F9FF", "name": "Soft Sky Tint", "role": "App icon background"}, {"hex": "#0C4A6E", "name": "Dark Slate", "role": "Typography"}], "creator": "SHL"}, {"id": "55", "name": "The Countdown Bell", "appName": "Chein", "tagline": "Instant Table Bell Countdown", "logoFn": "LogoCheinCountdownBell", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Warm Copper အရောင် စားသောက်ဆိုင် ဝန်ဆောင်မှု ခေါင်းလောင်း (Hotel Service Bell) ၏ အောက်ခြေ လျှာသည် နာရီလက်တံ (Clock Pendulum) အဖြစ် ည ၇ နာရီသို့ ညွှန်ပြနေပါသည်။", "rationale": "Chein (ရက်ချိန်း/အချိန်) ၏ နာရီလက်တံ သဘောတရားနှင့် စားသောက်ဆိုင် ဝန်ဆောင်မှု ခေါင်းလောင်း (Service Bell) တို့ကို ပေါင်းစပ်၍ ချက်ချင်း ဘိုကင်တင်နိုင်မှုကို ဖော်ပြထားပါသည်။", "typography": "Classic Modern Sans — Outfit or Plus Jakarta Sans. Timeless service and appointment elegance.", "prompt": "A hotel service bell countdown app icon. Warm copper service bell outline whose inner clapper extends down into a clock pendulum pointing to dinner time at 7 o'clock. Instant reservation bell concept, flat design.", "palette": [{"hex": "#D97706", "name": "Warm Copper", "role": "Primary service bell dome"}, {"hex": "#B45309", "name": "Deep Copper", "role": "Clock pendulum & base"}, {"hex": "#FFFBEB", "name": "Warm Cream Tint", "role": "App icon background"}, {"hex": "#78350F", "name": "Dark Amber", "role": "Typography"}], "creator": "SHL"}, {"id": "56", "name": "Modern Pulse Ring", "appName": "Chein", "tagline": "Modern Abstract Booking Ring", "logoFn": "LogoCheinModernAbstract", "accentColor": "#06B6D4", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein (Modern Abstract Pick) — စက်ဝိုင်း နာရီကွင်းလိုင်းနှင့် စားပွဲဝိုင်း Node ကို Modern Neon Cyan Gradient လိုင်းဖြင့် အဆင့်မြင့်စွာ ချိတ်ဆက်ထားသော Abstract Mark ဖြစ်ပါသည်။", "visual": "Electric Cyan Glow အရောင် နာရီစက်ဝိုင်းကွင်း (Ring) ပေါ်တွင် ညွှန်ပြနေသော လက်တံသည် စားပွဲဝိုင်း Node အစက်ဆီသို့ အလိုအလျောက် ညွှန်ပြနေသည့် Modern Abstract Vector Mark ဖြစ်ပါသည်။", "rationale": "Modern Keyword ၏ သဘောတရားအတိုင်း ရက်ချိန်း အချိန်နှင့် စားသောက်ဆိုင် စားပွဲရရှိရေးကို Neon Minimal Ring အဖြစ် လှပစွာ ပေါင်းစပ်ထားပါသည်။", "typography": "Ultra-Modern Tech Sans — Space Grotesk or Inter. Clean geometric lines.", "prompt": "An ultra-modern abstract dining booking logo. Electric cyan neon gradient ring connecting a clock tick to a central table node dot. Minimalist vector, flat white background, modern app icon design.", "palette": [{"hex": "#06B6D4", "name": "Electric Cyan", "role": "Primary pulse ring"}, {"hex": "#0891B2", "name": "Deep Cyan", "role": "Time node pointer"}, {"hex": "#ECFEFF", "name": "Cyan Tint", "role": "App icon background"}, {"hex": "#164E63", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "57", "name": "Chein-Bot Concierge", "appName": "Chein", "tagline": "Modern Mascot Booking Assistant", "logoFn": "LogoCheinModernMascot", "accentColor": "#8B5CF6", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Modern Violet အရောင် Rounded Robot ခေါင်း ပုံစံဖြစ်ပြီး အထက်တွင် နာရီလက်တံ Antenna ပါရှိကာ မျက်နှာတွင် ရင်းနှီးသော ပြုံးရွှင်သည့် မျဉ်းကြောင်း ပါရှိပါသည်။", "rationale": "Modern Mascot အမျိုးအစားအဖြစ် Chein ၏ AI စနစ်သုံး ရက်ချိန်းနှင့် စားပွဲ ဘိုကင် အကူ (Smart Concierge Assistant) ကို ချစ်ဖွယ်ရာ ရေးဆွဲထားပါသည်။", "typography": "Rounded Modern Mascot Sans — Quicksand or Outfit. Friendly AI assistant feel.", "prompt": "A modern tech mascot logo for a booking app. Friendly minimalist rounded robot head with clock hand antennae and a smiling plate mouth. Modern violet color scheme, flat design.", "palette": [{"hex": "#8B5CF6", "name": "Modern Violet", "role": "Primary mascot frame"}, {"hex": "#7C3AED", "name": "Deep Purple", "role": "Mascot eyes & smile"}, {"hex": "#F5F3FF", "name": "Soft Violet Tint", "role": "App icon background"}, {"hex": "#4C1D95", "name": "Dark Violet", "role": "Typography"}], "creator": "SHL"}, {"id": "58", "name": "Modern Shield Reserve", "appName": "Chein", "tagline": "Modern Emblem Security Booking", "logoFn": "LogoCheinModernEmblem", "accentColor": "#1E40AF", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Royal Navy အရောင် ခေတ်မီ ဂျီဩမေတြီ ဒိုင်း (Modern Shield Emblem) ၏ အလယ်တွင် ည ၇:၀၀ နာရီ စားသောက်ချိန် လက်တံနှင့် ပန်းကန်ပြား လိုင်းတို့ ပါရှိပါသည်။", "rationale": "Modern Emblem အမျိုးအစားအဖြစ် ရက်ချိန်း ဘိုကင် သေချာမှု (Secured Reservation) ကို ခေတ်မီ ဒိုင်းသင်္ကေတဖြင့် ဖော်ပြထားပါသည်။", "typography": "Modern Emblem Sans — Barlow SemiBold or Montserrat. Confident and protective geometry.", "prompt": "A sleek modern shield emblem logo for table booking. Royal navy geometric shield outline containing a 7 o'clock dinner time clock hand and plate dash ring. Modern heraldry vector mark.", "palette": [{"hex": "#1E40AF", "name": "Royal Navy", "role": "Primary shield emblem"}, {"hex": "#2563EB", "name": "Bright Blue", "role": "Dashed plate ring"}, {"hex": "#EFF6FF", "name": "Soft Blue Tint", "role": "App icon background"}, {"hex": "#1E3A8A", "name": "Dark Navy", "role": "Typography"}], "creator": "SHL"}, {"id": "59", "name": "Modern Slot Grid", "appName": "Chein", "tagline": "Modern Corporate Table Scheduling", "logoFn": "LogoCheinModernCorporate", "accentColor": "#0D9488", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Slate Teal အရောင် ကွက်လပ် Modular Grid (၄) ကွက် ပါရှိပြီး အတည်ပြုပြီးသော ရက်ချိန်းများအတွက် Checkmark ပုံစံလိုင်းများ ဖြည့်သွင်းထားသော Corporate Mark ဖြစ်ပါသည်။", "rationale": "Modern Corporate အမျိုးအစားအဖြစ် B2B စားသောက်ဆိုင် စားပွဲ စီမံခန့်ခွဲမှု စနစ်၏ တိကျသပ်ရပ်သော Grid Architecture ကို ဖော်ပြထားပါသည်။", "typography": "Corporate Tech Sans — Inter or Space Grotesk. Structured SaaS booking precision.", "prompt": "A modern corporate grid logo for a restaurant reservation platform. Slate teal rounded modular calendar slots with white checkmarks. Clean software B2B icon design.", "palette": [{"hex": "#0D9488", "name": "Slate Teal", "role": "Primary grid modules"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Checkmark icons inside grid"}, {"hex": "#F0FDFA", "name": "Soft Teal Tint", "role": "App icon background"}, {"hex": "#115E59", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "60", "name": "CHEIN C-Monogram", "appName": "Chein", "tagline": "Modern Wordmark Monogram", "logoFn": "LogoCheinModernWordmark", "accentColor": "#4F46E5", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ Chein (Modern Wordmark Pick) — 'C' စာလုံး၏ အလယ်လိုင်းက ၃ နာရီ နာရီလက်တံနှင့် အစားအသောက် အစက်လေးအဖြစ် အကူးအပြောင်း ပြုလုပ်ထားသော Modern Monogram ဖြစ်ပါသည်။", "visual": "Indigo Purple အရောင် 'C' အက္ခရာ ၏ အဆုံးသတ် လိုင်းသည် ညာဘက်သို့ မတ်မတ် ထွက်သွားကာ နာရီ ၃ နာရီ လက်တံနှင့် စားသောက်ဆိုင် လိုကေးရှင်း အစက်အဖြစ် ပြီးဆုံးသွားပါသည်။", "rationale": "Modern Wordmark အမျိုးအစားအဖြစ် စာလုံးဦး 'C' နှင့် 'Chein' ၏ အချိန်မှတ်သားမှုကို လိုရင်းတိုရှင်း စတိုင်ကျစွာ ဖန်တီးထားပါသည်။", "typography": "Custom Monogram Sans — Futura Bold or Outfit. Bold geometric stroke thickness.", "prompt": "An ultra-modern typographic monogram logo featuring the letter C. The right horizontal end of the C extends into a 3 o'clock time tick with a location dot. Indigo blue vector art.", "palette": [{"hex": "#4F46E5", "name": "Indigo Purple", "role": "Primary letter C"}, {"hex": "#6366F1", "name": "Bright Indigo", "role": "Clock tick hand"}, {"hex": "#EEF2FF", "name": "Soft Indigo Tint", "role": "App icon background"}, {"hex": "#312E81", "name": "Dark Indigo", "role": "Typography"}], "creator": "SHL"}, {"id": "61", "name": "Neo-Vintage Pocket Bell", "appName": "Chein", "tagline": "Modern Vintage Time Bell", "logoFn": "LogoCheinModernVintage", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Warm Copper အရောင် ရှေးဟောင်း သဲနာရီ/လက်ပတ်နာရီ အိတ်ကပ် (Pocket Watch) နှင့် ခေါင်းလောင်း (Service Bell) တို့၏ လိုင်းများကို Modern Neo-Retro Line art အဖြစ် ရေးဆွဲထားပါသည်။", "rationale": "Modern Vintage အမျိုးအစားအဖြစ် ဂန္ထဝင်မြောက်သော နာရီလက္ခဏာနှင့် ခေတ်မီ စားသောက်ဆိုင် ခေါင်းလောင်းကို စတိုင်ကျစွာ ပေါင်းစပ်ထားပါသည်။", "typography": "Modern Vintage Serif/Sans — Playfair Display / DM Mono. Timeless craftsmanship.", "prompt": "A neo-vintage pocket watch and hotel service bell line art logo. Warm copper and bronze line art on cream background, modern retro aesthetic for dining appointments.", "palette": [{"hex": "#D97706", "name": "Warm Copper", "role": "Primary pocket watch ring"}, {"hex": "#B45309", "name": "Deep Bronze", "role": "Inner service bell dome"}, {"hex": "#FFFBEB", "name": "Warm Cream Tint", "role": "App icon background"}, {"hex": "#78350F", "name": "Dark Amber", "role": "Typography"}], "creator": "SHL"}, {"id": "62", "name": "The Cloche Clock", "appName": "Chein", "tagline": "Modern Classic Dining Clock", "logoFn": "LogoCheinModernClassic", "accentColor": "#059669", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Emerald Forest အရောင် စားသောက်ဆိုင် Food Cloche အဖုံး silhouette ၏ ထိပ်သီး ကိုင်တွယ်ရာ နေရာသည် နာရီလက်တံ (Clock Hand Handle) အဖြစ် ရိုးရှင်းပြတ်သားစွာ ရှိနေပါသည်။", "rationale": "Modern Classic အမျိုးအစားအဖြစ် ခေတ်မတိမ်နိုင်သော Cloche ပန်းကန်ဖုံး ပုံရိပ်နှင့် အချိန် တိကျမှုကို Clean Minimalist Art အဖြစ် ဖန်တီးထားပါသည်။", "typography": "Classic Minimalist Sans — Inter or Avenir. Pure functional clarity.", "prompt": "A modern classic minimalist cloche logo for dining reservation. Emerald green fine dining cloche cover outline with a clock hand handle at top. Clean timeless vector icon.", "palette": [{"hex": "#059669", "name": "Emerald Forest", "role": "Primary cloche outline"}, {"hex": "#047857", "name": "Deep Emerald", "role": "Clock hand handle"}, {"hex": "#ECFDF5", "name": "Soft Mint Tint", "role": "App icon background"}, {"hex": "#064E3B", "name": "Dark Emerald", "role": "Typography"}], "creator": "SHL"}, {"id": "63", "name": "The Lightning Q", "appName": "DineQ", "tagline": "Instant Fast-Track Dining Queue", "logoFn": "LogoDineQLightning", "accentColor": "#8B5CF6", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Electric Violet အရောင် 'Q' စာလုံး၏ အောက်ခြေ တန်းလိုင်းသည် လျှပ်စီးကြောင်း (Lightning Bolt) အဖြစ် စားပွဲဝိုင်း ကွင်းထဲသို့ စူးဝင်သွားသော Abstract Mark ဖြစ်ပါသည်။", "rationale": "DineQ (Dine + Quick / Queue) ၏ လျှပ်တစ်ပြက် မြန်ဆန်သော တန်းစီစနစ် (Lightning Queue) ကို ထိရောက်ဆန်းသစ်စွာ ရေးဆွဲထားပါသည်။", "typography": "Ultra-Fast Speed Sans — Space Grotesk or Cabinet Grotesk. Sharp electric energy.", "prompt": "An electric violet abstract logo for DineQ. Minimalist letter Q circle where the diagonal tail forms a lightning bolt intersecting a dining table ring. High-speed vector mark.", "palette": [{"hex": "#8B5CF6", "name": "Electric Violet", "role": "Primary Q ring"}, {"hex": "#7C3AED", "name": "Deep Purple", "role": "Lightning bolt tail"}, {"hex": "#F5F3FF", "name": "Soft Violet Tint", "role": "App icon background"}, {"hex": "#4C1D95", "name": "Dark Violet", "role": "Typography"}], "creator": "SHL"}, {"id": "64", "name": "Smart Queue Loop", "appName": "DineQ", "tagline": "Seamless Corporate Table Queueing", "logoFn": "LogoDineQSmartQueue", "accentColor": "#0D9488", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Teal Blue အရောင် အဆက်မပြတ် လည်ပတ်နေသော Loop လိုင်းသည် 'Q' စာလုံးကို ပုံဖော်ပေးထားပြီး အတွင်း၌ စားပွဲဝိုင်းနှင့် တန်းစီအစက် (Queue Nodes) (၃) စက် ပါရှိပါသည်။", "rationale": "DineQ ၏ စားသောက်ဆိုင် တန်းစီမှု စီမံခန့်ခွဲမှု စနစ် (Seamless Queue Flow) ကို သပ်ရပ်သော Corporate Loop ဖြင့် ဖော်ပြထားပါသည်။", "typography": "Corporate Tech Sans — Inter or Space Grotesk. Structured queue flow.", "prompt": "A corporate teal blue logo for DineQ. Continuous loop forming the letter Q enclosing a round table with 3 queue position dots. Clean SaaS booking vector design.", "palette": [{"hex": "#0D9488", "name": "Teal Slate", "role": "Primary Q ring"}, {"hex": "#14B8A6", "name": "Bright Teal", "role": "Queue nodes"}, {"hex": "#F0FDFA", "name": "Soft Teal Tint", "role": "App icon background"}, {"hex": "#115E59", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "65", "name": "Q-Bot Speed Concierge", "appName": "DineQ", "tagline": "Smart AI Dining Assistant Mascot", "logoFn": "LogoDineQBotMascot", "accentColor": "#EA580C", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ DineQ (Top Mascot Pick) — 'Q' စာလုံး သဏ္ဌာန် ပြုံးရွှင်သော Robot ခေါင်း ပုံစံဖြစ်ပြီး တန်းစီမှု အမြန်ဆုံး အကူအညီပေးနိုင်သည့် AI Mascot ဖြစ်ပါသည်။", "visual": "Vivid Orange အရောင် Rounded 'Q' ခေါင်း ပုံစံဖြစ်ပြီး အလယ်တွင် ပြုံးနေသော ပန်းကန်ပြား မျက်မှန် Visor နှင့် အနောက်တွင် ဇွန်း အမြီး ပါရှိပါသည်။", "rationale": "DineQ ၏ စမတ်ကျသော AI အကူစနစ်နှင့် မိတ်ဆွေသဖွယ် တန်းစီပေးသည့် ရင်းနှီးဖွယ်ရာ Mascot သင်္ကေတ ဖြစ်ပါသည်။", "typography": "Friendly Mascot Sans — Quicksand or Outfit. Playful tech concierge style.", "prompt": "A modern mascot logo for DineQ. Vibrant orange Q-shaped robot head with a smiling plate visor and a cute fork tail. Friendly fast-dining mascot icon.", "palette": [{"hex": "#EA580C", "name": "Vivid Orange", "role": "Primary mascot head"}, {"hex": "#C2410C", "name": "Deep Orange", "role": "Mascot visor details"}, {"hex": "#FFF7ED", "name": "Soft Orange Tint", "role": "App icon background"}, {"hex": "#7C2D12", "name": "Dark Amber", "role": "Typography"}], "creator": "SHL"}, {"id": "66", "name": "The Fast-Pass Shield", "appName": "DineQ", "tagline": "VIP Priority Dine Emblem", "logoFn": "LogoDineQFastPassShield", "accentColor": "#4F46E5", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Royal Indigo အရောင် ဒိုင်းသင်္ကေတ (Shield Emblem) ၏ အလယ်တွင် 'Q' စာလုံး အမှတ်တံဆိပ်နှင့် ဇွန်းခက် လိုင်းများ (Fork Tines) ပါရှိပါသည်။", "rationale": "DineQ ဖြင့် ဘိုကင်တင်ထားသူများ တန်းစီစရာမလိုဘဲ တိုက်ရိုက် ဝင်ရောက်နိုင်သော VIP Priority Pass သဘောတရားကို ဖော်ပြထားပါသည်။", "typography": "Modern Emblem Sans — Barlow SemiBold or Montserrat. Confident VIP priority feel.", "prompt": "A sleek VIP emblem logo for DineQ. Royal indigo geometric shield containing a central Q passcode with fork tines integrated inside the loop. Premium dining pass vector mark.", "palette": [{"hex": "#4F46E5", "name": "Royal Indigo", "role": "Primary shield emblem"}, {"hex": "#6366F1", "name": "Bright Indigo", "role": "Inner Q & fork tines"}, {"hex": "#EEF2FF", "name": "Soft Indigo Tint", "role": "App icon background"}, {"hex": "#312E81", "name": "Dark Indigo", "role": "Typography"}], "creator": "SHL"}, {"id": "67", "name": "Speed-Line Monogram", "appName": "DineQ", "tagline": "Dynamic Minimal Speed Wordmark", "logoFn": "LogoDineQSpeedlineWordmark", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Sky Slate အရောင် အလျင်အမြန် စောင်းနေသော Speed Lines (၃) လိုင်းသည် 'Q' စာလုံး၏ မျဉ်းကွေးနှင့် တန်းစီ အစက်ဆီသို့ အပြိုင် သွားနေပါသည်။", "rationale": "DineQ ၏ 'Quick / Speed' လက္ခဏာကို Minimalist Vector Wordmark အဖြစ် သက်ဝင်လှုပ်ရှားစွာ ဖန်တီးထားပါသည်။", "typography": "Dynamic Italic Sans — Space Grotesk or Futura Bold Italic. Aerodynamic speed alignment.", "prompt": "A modern typographic monogram logo for DineQ. Three dynamic italic speed lines sweeping into a minimal letter Q with a dining dot. Sky blue vector art.", "palette": [{"hex": "#0284C7", "name": "Sky Slate", "role": "Primary speed arcs"}, {"hex": "#0369A1", "name": "Deep Sky Blue", "role": "Main Q tail stroke"}, {"hex": "#F0F9FF", "name": "Soft Sky Tint", "role": "App icon background"}, {"hex": "#0C4A6E", "name": "Dark Slate", "role": "Typography"}], "creator": "SHL"}, {"id": "68", "name": "The Vintage Queue Bell", "appName": "DineQ", "tagline": "Heritage Hospitality Bell Q", "logoFn": "LogoDineQVintageBell", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Warm Copper အရောင် ရှေးဟောင်း စားသောက်ဆိုင် ဝန်ဆောင်မှု ခေါင်းလောင်း Silhouette သည် အောက်ခြေ 'Q' စာလုံး အဝိုင်း လိုင်းအဖြစ် သဘာဝကျစွာ မွမ်းမံထားပါသည်။", "rationale": "Classic Dining Hospitality နှင့် DineQ ၏ မြန်ဆန်သော ဝန်ဆောင်မှု ခေါင်းလောင်း သဘောတရားကို Neo-Vintage Line art အဖြစ် ဖော်ပြထားပါသည်။", "typography": "Modern Vintage Serif/Sans — Playfair Display / DM Mono. Timeless service elegance.", "prompt": "A neo-vintage hotel service bell line art logo forming the letter Q. Warm copper and bronze tones on cream background, modern retro dining mark.", "palette": [{"hex": "#D97706", "name": "Warm Copper", "role": "Primary bell dome"}, {"hex": "#B45309", "name": "Deep Bronze", "role": "Q tail & bell handle"}, {"hex": "#FFFBEB", "name": "Warm Cream Tint", "role": "App icon background"}, {"hex": "#78350F", "name": "Dark Amber", "role": "Typography"}], "creator": "SHL"}, {"id": "69", "name": "The Classic Cloche Q", "appName": "DineQ", "tagline": "Gourmet Elegant Dining Q", "logoFn": "LogoDineQClassicCloche", "accentColor": "#059669", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Forest Emerald အရောင် Gourmet Cloche ပန်းကန်ဖုံး Silhouette ၏ အထက် ကိုင်တွယ်ရာ အငွေ့လိုင်းသည် 'Q' စာလုံး သဏ္ဌာန်အဖြစ် တွန့်ကွေးနေပါသည်။", "rationale": "High-End Fine Dining စားသောက်ဆိုင်များအတွက် DineQ ၏ ဂန္ထဝင်မြောက်သော Quality & Quickness ကို ဖော်ပြထားပါသည်။", "typography": "Classic Gourmet Sans — Inter or Avenir. Fine dining minimalism.", "prompt": "A classic minimalist gourmet cloche logo for DineQ. Emerald green fine dining cloche cover whose top handle curves gracefully into the letter Q.", "palette": [{"hex": "#059669", "name": "Forest Emerald", "role": "Primary cloche outline"}, {"hex": "#047857", "name": "Deep Emerald", "role": "Q handle flourish"}, {"hex": "#ECFDF5", "name": "Soft Mint Tint", "role": "App icon background"}, {"hex": "#064E3B", "name": "Dark Emerald", "role": "Typography"}], "creator": "SHL"}, {"id": "70", "name": "Quantum Table", "appName": "DineQ", "tagline": "Futuristic 3D Isometric Table Q", "logoFn": "LogoDineQQuantumTable", "accentColor": "#06B6D4", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Neon Cyan အရောင် 3D Isometric စားပွဲဝိုင်း ဘဲဥပုံ အဝိုင်းပေါ်တွင် အောက်ခြေ လက်တံ ပါရှိပြီး ဗဟိုတွင် Floating Node Dot ပါဝင်သော Abstract Tech Mark ဖြစ်ပါသည်။", "rationale": "DineQ ၏ အဆင့်မြင့် တန်းစီ နည်းပညာ (Quantum Table Management) ကို ခေတ်မီ 3D Geometric Vector အဖြစ် ဖန်တီးထားပါသည်။", "typography": "Futuristic Tech Sans — Space Grotesk or Orbitron. Modern 3D geometry.", "prompt": "A futuristic 3D isometric table ring logo for DineQ. Glowing cyan oval table with a floating center node and a sharp Q tail stroke. Modern tech vector icon.", "palette": [{"hex": "#06B6D4", "name": "Neon Cyan", "role": "Primary isometric table"}, {"hex": "#0891B2", "name": "Deep Cyan", "role": "Q tail stroke"}, {"hex": "#ECFEFF", "name": "Cyan Tint", "role": "App icon background"}, {"hex": "#164E63", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "71", "name": "The Queue Arrow", "appName": "DineQ", "tagline": "Direct Fast-Track Queueing", "logoFn": "LogoDineQQueueArrow", "accentColor": "#1E40AF", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Royal Navy အရောင် 'Q' စာလုံး ၏ အောက်ခြေ လက်တံနေရာတွင် အရှေ့သို့ တက်ကြွစွာ ညွှန်ပြနေသော Fast-Track Arrow မြှားခေါင်း ပါရှိပါသည်။", "rationale": "DineQ ၏ တန်းစီမှုကို ချက်ချင်း ကျော်လွန်နိုင်သော တိုက်ရိုက် ဦးစားပေး မြှား (Fast-Track Arrow) သဘောတရား ဖြစ်ပါသည်။", "typography": "Corporate Precision Sans — Inter or Space Grotesk. Directional queueing clarity.", "prompt": "A corporate navy blue logo for DineQ. Clean letter Q circle whose diagonal tail is a forward-pointing fast-track arrow. Efficient queue navigation icon.", "palette": [{"hex": "#1E40AF", "name": "Royal Navy", "role": "Primary Q ring"}, {"hex": "#2563EB", "name": "Bright Blue", "role": "Fast-track arrow tail"}, {"hex": "#EFF6FF", "name": "Soft Blue Tint", "role": "App icon background"}, {"hex": "#1E3A8A", "name": "Dark Navy", "role": "Typography"}], "creator": "SHL"}, {"id": "72", "name": "Cheery Q-Bird", "appName": "DineQ", "tagline": "Lively Speedy Bird Mascot", "logoFn": "LogoDineQBirdMascot", "accentColor": "#F43F5E", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Bright Coral အရောင် သွက်လက်သော ငှက်ကလေး Mascot silhouette သည် ခန္ဓာကိုယ် ကွေးညွတ်မှုဖြင့် 'Q' စာလုံး ပုံစံ ဖြစ်နေပြီး နှုတ်သီးတွင် ဇွန်းခက် ကိုင်ထားပါသည်။", "rationale": "DineQ ၏ လျင်မြန် သွက်လက်မှု (Speedy Bird) နှင့် အစားအသောက် ပျော်ရွှင်မှုကို Mascot အဖြစ် ရေးဆွဲထားပါသည်။", "typography": "Lively Rounded Sans — Quicksand or Outfit. Vibrant mascot energy.", "prompt": "A lively coral bird mascot logo for DineQ. Minimalist bird holding a fork in its beak, body curving naturally into a letter Q silhouette.", "palette": [{"hex": "#F43F5E", "name": "Bright Coral", "role": "Primary bird body"}, {"hex": "#E11D48", "name": "Deep Rose", "role": "Bird tail & eye"}, {"hex": "#FFF1F2", "name": "Soft Coral Tint", "role": "App icon background"}, {"hex": "#881337", "name": "Dark Rose", "role": "Typography"}], "creator": "SHL"}, {"id": "73", "name": "The Priority Ticket", "appName": "DineQ", "tagline": "Exclusive VIP Ticket Emblem", "logoFn": "LogoDineQTicketEmblem", "accentColor": "#CA8A04", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Golden Yellow အရောင် အစွန်း အထိုးအဆစ် notched ticket ဘောင် အလယ်တွင် 'Q' စာလုံး အပြည့် ရေးထွင်းထားသော Gold Stamp Emblem ဖြစ်ပါသည်။", "rationale": "DineQ ၏ VIP Ticket Pass သင်္ကေတအဖြစ် စားသောက်ဆိုင် သီးသန့် တန်းစီခွင့် တံဆိပ်ကို ပုံဖော်ထားပါသည်။", "typography": "Classic Stamp Sans — Montserrat or Barlow. Exclusive VIP ticket pass geometry.", "prompt": "A golden ticket emblem logo for DineQ. Perforated priority ticket border enclosing a clean central letter Q mark. Luxury reservation ticket vector art.", "palette": [{"hex": "#CA8A04", "name": "Golden Yellow", "role": "Primary ticket border"}, {"hex": "#EAB308", "name": "Bright Gold", "role": "Inner Q stroke"}, {"hex": "#FEFCE8", "name": "Warm Yellow Tint", "role": "App icon background"}, {"hex": "#713F12", "name": "Dark Gold", "role": "Typography"}], "creator": "SHL"}, {"id": "74", "name": "D-Q Interlock Monogram", "appName": "DineQ", "tagline": "Clever Interlocking Wordmark", "logoFn": "LogoDineQDQInterlock", "accentColor": "#4F46E5", "recommended": false, "isTopPick": false, "recommendationReason": "⭐ DineQ (Top Monogram Pick) — 'D' နှင့် 'Q' စာလုံး (၂) လုံးကို အဆက်မပြတ် Continuous Vector Stroke ဖြင့် တသားတည်း ချိတ်ဆက်ထားသော Smart Monogram ဖြစ်ပါသည်။", "visual": "Indigo Purple အရောင် 'D' စာလုံး ၏ ဘယ်ဘက် မတ်လိုင်းနှင့် 'Q' စာလုံး ၏ အဝိုင်းလိုင်းတို့သည် တစ်ဆက်တည်း ပေါင်းစည်းထားသော Monogram Vector ဖြစ်ပါသည်။", "rationale": "DineQ (Dine + Queue) ၏ နာမည်ဦး စာလုံးနှစ်ခုကို ကျစ်လစ် တိကျစွာ ပေါင်းစပ်ထားသော Modern Clever Mark ဖြစ်ပါသည်။", "typography": "Custom Monogram Sans — Futura Bold or Space Grotesk. Smart geometric stroke interlocking.", "prompt": "An ultra-modern clever monogram logo for DineQ. Interlocking continuous stroke combining letter D and letter Q seamlessly. Indigo blue vector design.", "palette": [{"hex": "#4F46E5", "name": "Indigo Purple", "role": "Primary letter D & Q"}, {"hex": "#6366F1", "name": "Bright Indigo", "role": "Inner Q circle"}, {"hex": "#EEF2FF", "name": "Soft Indigo Tint", "role": "App icon background"}, {"hex": "#312E81", "name": "Dark Indigo", "role": "Typography"}], "creator": "SHL"}, {"id": "75", "name": "Neo-Retro Diner Q", "appName": "DineQ", "tagline": "50s Nostalgic Diner Sign", "logoFn": "LogoDineQRetroDiner", "accentColor": "#EF4444", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Crimson Red အရောင် 1950s American Diner Neon Sign ပုံစံ ဘဲဥပုံ 'Q' အကြမ်းလိုင်း ပါရှိပြီး အလယ်တွင် ဇွန်းခက် (Neon Fork) ထွန်းလင်းနေပါသည်။", "rationale": "DineQ ၏ စားသောက်ဆိုင် ရသနှင့် ခေတ်မီ ရေပန်းစားသော Neo-Retro Line art စတိုင်ကို ပေါင်းစပ်ထားပါသည်။", "typography": "Neo-Retro Diner Sans — Market Sans or Outfit. Nostalgic 50s diner neon feel.", "prompt": "A neo-retro 50s diner sign logo for DineQ. Crimson red neon oval outline forming letter Q with a stylized neon fork accent inside.", "palette": [{"hex": "#EF4444", "name": "Crimson Red", "role": "Primary neon Q outline"}, {"hex": "#DC2626", "name": "Deep Red", "role": "Fork accent"}, {"hex": "#FEF2F2", "name": "Soft Red Tint", "role": "App icon background"}, {"hex": "#7F1D1D", "name": "Dark Red", "role": "Typography"}], "creator": "SHL"}, {"id": "76", "name": "Minimal Hourglass Q", "appName": "DineQ", "tagline": "Time-Saving Classic Line Art", "logoFn": "LogoDineQHourglassClassic", "accentColor": "#0D9488", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Slate Teal အရောင် ရိုးရှင်းသော သဲနာရီ (Hourglass) Silhouette ကို 'Q' စာလုံး အဝိုင်းအတွင်း အတိအကျ မြှုပ်နှံထားသော Line Art ဖြစ်ပါသည်။", "rationale": "DineQ ဖြင့် အချိန်ကုန် သက်သာစေမှု (Time-Saving Queueing) ကို Clean Fine Line Art အဖြစ် ဖော်ပြထားပါသည်။", "typography": "Minimal Fine-Line Sans — Inter or DM Mono. Pure functional elegance.", "prompt": "A minimalist classic line art logo for DineQ. Sleek hourglass silhouette nested inside the loop of a fine-line letter Q mark.", "palette": [{"hex": "#0D9488", "name": "Slate Teal", "role": "Primary Q & hourglass"}, {"hex": "#14B8A6", "name": "Bright Teal", "role": "Hourglass sand"}, {"hex": "#F0FDFA", "name": "Soft Teal Tint", "role": "App icon background"}, {"hex": "#115E59", "name": "Dark Teal", "role": "Typography"}], "creator": "SHL"}, {"id": "77", "name": "The Express Signal", "appName": "DineQ", "tagline": "Proximity Radar Queue Signal", "logoFn": "LogoDineQRadarAbstract", "accentColor": "#8B5CF6", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Violet Glow အရောင် ရေလှိုင်း Radar Wave စက်ဝိုင်း (၃) ထပ်သည် ဗဟို စားပွဲဝိုင်းမှ ဖြာထွက်၍ အောက်ခြေ 'Q' လက်တံအဖြစ် အဆုံးသတ်ထားပါသည်။", "rationale": "DineQ ၏ အနီးအနား စားသောက်ဆိုင် တန်းစီမှု Radar နည်းပညာ (Proximity Queue Signal) ကို ဖော်ပြထားပါသည်။", "typography": "Radar Tech Sans — Space Grotesk or Inter. Signal transmission geometry.", "prompt": "An abstract radar signal logo for DineQ. Three concentric dashed violet radar rings emitting from a central dining node to form a letter Q shape.", "palette": [{"hex": "#8B5CF6", "name": "Violet Glow", "role": "Primary radar rings"}, {"hex": "#7C3AED", "name": "Deep Purple", "role": "Q tail stroke"}, {"hex": "#F5F3FF", "name": "Soft Violet Tint", "role": "App icon background"}, {"hex": "#4C1D95", "name": "Dark Violet", "role": "Typography"}], "creator": "SHL"}, {"id": "78", "name": "The Queue Pulse", "appName": "DineQ", "tagline": "Real-Time Live Queue Analytics", "logoFn": "LogoDineQPulseCorporate", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Rose Red အရောင် နှလုံးခုန်နှုန်း ECG Heartbeat Pulse လိုင်းသည် 'Q' စာလုံး ၏ အလယ်ကို ဖြတ်သန်း၍ Live Queue status ကို ပုံဖော်ပေးထားပါသည်။", "rationale": "DineQ ၏ အချိန်နှင့်တပြေးညီ တန်းစီမှုအခြေအနေ (Real-Time Live Analytics) ကို ပြသထားသော Corporate Mark ဖြစ်ပါသည်။", "typography": "Corporate Analytics Sans — Inter or Space Grotesk. Live status precision.", "prompt": "A corporate rose red logo for DineQ. Letter Q circle intersected by a real-time ECG heartbeat pulse line representing live queue tracking.", "palette": [{"hex": "#E11D48", "name": "Rose Red", "role": "Primary pulse Q ring"}, {"hex": "#F43F5E", "name": "Bright Rose", "role": "ECG heartbeat line"}, {"hex": "#FFF1F2", "name": "Soft Rose Tint", "role": "App icon background"}, {"hex": "#881337", "name": "Dark Rose", "role": "Typography"}], "creator": "SHL"}, {"id": "79", "name": "Bite-Mark Q Monogram", "appName": "DineQ", "tagline": "Appetizing Crescent Bite Q", "logoFn": "LogoDineQBiteMonogram", "accentColor": "#EAB308", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Golden Yellow အရောင် ထူထဲသော 'Q' စာလုံး အထက်ညာဘက်တွင် လဆန်းသဏ္ဌာန် ကိုက်ရာ (Crescent Bite Mark) ကို ရောစပ်ထားသော Bold Monogram ဖြစ်ပါသည်။", "rationale": "DineQ ၏ အစားအသောက် ရသ အရသာနှင့် နာမည်ဦး 'Q' စာလုံးကို ပါးနပ်စွာ ရေးဆွဲထားပါသည်။", "typography": "Bold Appetizing Sans — Cabinet Grotesk or Futura Bold. Playful bite mark design.", "prompt": "A bold typographic logo for DineQ featuring a thick golden yellow letter Q with a crescent bite mark taken out of the top right ring.", "palette": [{"hex": "#EAB308", "name": "Golden Yellow", "role": "Primary Q stroke"}, {"hex": "#CA8A04", "name": "Deep Gold", "role": "Q tail"}, {"hex": "#FEFCE8", "name": "Soft Yellow Tint", "role": "App icon background"}, {"hex": "#713F12", "name": "Dark Gold", "role": "Typography"}], "creator": "SHL"}, {"id": "80", "name": "Chef Q-Hat Emblem", "appName": "DineQ", "tagline": "Professional Culinary Quality Emblem", "logoFn": "LogoDineQHatEmblem", "accentColor": "#16A34A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Emerald Green အရောင် စားဖိုမှူး မီးဖိုချောင် မီးဖိုအုပ်ဆောင်း (Chef Toque Hat) Silhouette ၏ အောက်ခြေလိုင်းသည် 'Q' စာလုံး အဝိုင်းအဖြစ် သမမျှတစွာ တည်ရှိနေပါသည်။", "rationale": "DineQ ၏ စားသောက်ဆိုင် အရည်အသွေးမြင့်မားမှု (Culinary Excellence) နှင့် တန်းစီ စနစ်ကို ဖော်ပြထားပါသည်။", "typography": "Professional Culinary Sans — Barlow or Montserrat. Gourmet quality badge.", "prompt": "A professional chef toque hat emblem for DineQ. Emerald green circular emblem where the chef hat base extends into a letter Q loop.", "palette": [{"hex": "#16A34A", "name": "Emerald Green", "role": "Primary chef hat Q"}, {"hex": "#15803D", "name": "Deep Green", "role": "Q tail stroke"}, {"hex": "#F0FDF4", "name": "Soft Green Tint", "role": "App icon background"}, {"hex": "#14532D", "name": "Dark Green", "role": "Typography"}], "creator": "SHL"}, {"id": "81", "name": "Origami Q Bowl", "appName": "DineQ", "tagline": "3D Geometric Folded Bowl Q", "logoFn": "LogoDineQOrigamiClassic", "accentColor": "#10B981", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Mint Green အရောင် ဂျီဩမေတြီ ခေါက်ရိုး Origami Ramen Bowl Silhouette ၏ အောက်ခြေ တုတ်လိုင်းသည် 'Q' စာလုံး လက်တံအဖြစ် ထွက်ပေါ်နေပါသည်။", "rationale": "DineQ ၏ ခေတ်မီ 3D စားသောက်ဆိုင် ရသနှင့် ခေါက်ဆွဲ ပန်းကန် လက္ခဏာကို ဖော်ပြထားပါသည်။", "typography": "Architectural Tech Sans — Space Grotesk or Outfit. Origami faceted geometry.", "prompt": "An origami 3D folded ramen bowl logo for DineQ. Mint green faceted geometry bowl with a diagonal chopstick tail completing a letter Q mark.", "palette": [{"hex": "#10B981", "name": "Mint Green", "role": "Primary origami bowl"}, {"hex": "#059669", "name": "Deep Mint", "role": "Chopstick Q tail"}, {"hex": "#ECFDF5", "name": "Soft Mint Tint", "role": "App icon background"}, {"hex": "#064E3B", "name": "Dark Green", "role": "Typography"}], "creator": "SHL"}, {"id": "82", "name": "Q-Panda Fast-Dine", "appName": "DineQ", "tagline": "Cute Panda Plate Mascot", "logoFn": "LogoDineQPandaMascot", "accentColor": "#18181B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Minimal Black & White အရောင် ချစ်ဖွယ်ရာ Panda ဝက်ဝံ မျက်နှာ ပန်းကန်ပြား မိတ်ဆွေသည် အောက်ခြေ အမြီး 'Q' စာလုံး လိုင်းဖြင့် ရယ်မောနေပါသည်။", "rationale": "DineQ ၏ လူကြိုက်များ ချစ်ခင်ဖွယ်ရာ Icon Mascot အဖြစ် Panda သဘောတရားကို ဖန်တီးထားပါသည်။", "typography": "Cute Modern Mascot Sans — Quicksand or Outfit. Iconic mascot presence.", "prompt": "A cute panda mascot logo for DineQ. Minimalist black and white panda face peeking over a round dining plate with its tail forming the letter Q stem.", "palette": [{"hex": "#18181B", "name": "Charcoal Black", "role": "Primary panda eyes & tail"}, {"hex": "#FFFFFF", "name": "Pure White", "role": "Panda face plate"}, {"hex": "#FAFAFA", "name": "Soft Neutral Tint", "role": "App icon background"}, {"hex": "#09090B", "name": "Dark Black", "role": "Typography"}], "creator": "SHL"}, {"id": "83", "name": "The Kanji Seal", "appName": "Shoku", "tagline": "Kanji 食 Hanko Stamp", "logoFn": "LogoShokuConcept1", "accentColor": "#D9381E", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Hanko Stamp Seal with 食 Kanji character. - The Kanji Seal design for Shoku.", "rationale": "Zen Artisan Craft - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. The Kanji Seal concept with #D9381E palette. Minimalist icon.", "palette": [{"hex": "#D9381E", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "84", "name": "Zen Chopsticks Plate", "appName": "Shoku", "tagline": "Solar Chopsticks Plate", "logoFn": "LogoShokuConcept2", "accentColor": "#1E293B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Parallel chopsticks intersecting solar plate ring. - Zen Chopsticks Plate design for Shoku.", "rationale": "Japanese Modern Minimal - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Zen Chopsticks Plate concept with #1E293B palette. Minimalist icon.", "palette": [{"hex": "#1E293B", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "85", "name": "Four Elements Grid", "appName": "Shoku", "tagline": "Food Plant Color Craft Quadrant", "logoFn": "LogoShokuConcept3", "accentColor": "#16A34A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "2x2 grid forming abstract S leaf & bowl. - Four Elements Grid design for Shoku.", "rationale": "Eco Culinary Harmony - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Four Elements Grid concept with #16A34A palette. Minimalist icon.", "palette": [{"hex": "#16A34A", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "86", "name": "Origami Steam", "appName": "Shoku", "tagline": "Faceted Steam Waves & Bowl", "logoFn": "LogoShokuConcept4", "accentColor": "#C2410C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Origami ceramic bowl emitting S steam waves. - Origami Steam design for Shoku.", "rationale": "Craft Origami Geometry - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Origami Steam concept with #C2410C palette. Minimalist icon.", "palette": [{"hex": "#C2410C", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "87", "name": "Master's Knife Ring", "appName": "Shoku", "tagline": "Chef Santoku Plating Ring", "logoFn": "LogoShokuConcept5", "accentColor": "#451A03", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Plating ring silhouette with Santoku knife cutout. - Master's Knife Ring design for Shoku.", "rationale": "Fine Dining Craft - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Master's Knife Ring concept with #451A03 palette. Minimalist icon.", "palette": [{"hex": "#451A03", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "88", "name": "Eco Plant-to-Plate", "appName": "Shoku", "tagline": "Single Line Sprout Plate", "logoFn": "LogoShokuConcept6", "accentColor": "#3F6212", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Single line drawing forming leaf & dinner plate. - Eco Plant-to-Plate design for Shoku.", "rationale": "Organic Food Culture - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Eco Plant-to-Plate concept with #3F6212 palette. Minimalist icon.", "palette": [{"hex": "#3F6212", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "89", "name": "Color Flavor Stack", "appName": "Shoku", "tagline": "Overlapping Translucent Flavor Pills", "logoFn": "LogoShokuConcept7", "accentColor": "#EF4444", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "3 overlapping translucent flavor pills forming S. - Color Flavor Stack design for Shoku.", "rationale": "Modern Abstract Flavor - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Color Flavor Stack concept with #EF4444 palette. Minimalist icon.", "palette": [{"hex": "#EF4444", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "90", "name": "Zen Garden Ripple", "appName": "Shoku", "tagline": "Concentric Sand Ripples", "logoFn": "LogoShokuConcept8", "accentColor": "#E7E5E4", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Concentric circular sand ripples with center seat. - Zen Garden Ripple design for Shoku.", "rationale": "Zen Garden Precision - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Zen Garden Ripple concept with #E7E5E4 palette. Minimalist icon.", "palette": [{"hex": "#E7E5E4", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "91", "name": "Noren Doorway Gate", "appName": "Shoku", "tagline": "Split Noren Doorway Cutlery", "logoFn": "LogoShokuConcept9", "accentColor": "#0F172A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Split Japanese noren curtain with fork doorway. - Noren Doorway Gate design for Shoku.", "rationale": "Traditional Noren Entry - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Noren Doorway Gate concept with #0F172A palette. Minimalist icon.", "palette": [{"hex": "#0F172A", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "92", "name": "Shoku Craft Badge", "appName": "Shoku", "tagline": "Neo-Brutalist Stencil Hexagon", "logoFn": "LogoShokuConcept10", "accentColor": "#DC2626", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Solid geometric hexagon with SHOKU stencil cutout. - Shoku Craft Badge design for Shoku.", "rationale": "Neo-Brutalist Badge - Clean vector brand identity concept for Shoku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Shoku. Shoku Craft Badge concept with #DC2626 palette. Minimalist icon.", "palette": [{"hex": "#DC2626", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D9381E", "name": "Brand Base", "role": "Typography"}, {"hex": "#FDFBF7", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "93", "name": "Clock Seat Dial", "appName": "Yoyaku", "tagline": "Clock Dial Calendar Seat", "logoFn": "LogoYoyakuConcept1", "accentColor": "#BE123C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Circular clock dial pointing to highlighted red seat dot. - Clock Seat Dial design for Yoyaku.", "rationale": "Punctual Reservation - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Clock Seat Dial concept with #BE123C palette. Minimalist icon.", "palette": [{"hex": "#BE123C", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "94", "name": "Double Y Pin", "appName": "Yoyaku", "tagline": "Interlocked Y Keyhole Pin", "logoFn": "LogoYoyakuConcept2", "accentColor": "#1E3A8A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Two interlocked Y letters forming keyhole map pin. - Double Y Pin design for Yoyaku.", "rationale": "Precision Booking Monogram - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Double Y Pin concept with #1E3A8A palette. Minimalist icon.", "palette": [{"hex": "#1E3A8A", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "95", "name": "Reserved Ribbon Tag", "appName": "Yoyaku", "tagline": "Folded Reserved Stand Tag", "logoFn": "LogoYoyakuConcept3", "accentColor": "#065F46", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Sleek folded ribbon tag with Y cutout in center crease. - Reserved Ribbon Tag design for Yoyaku.", "rationale": "Premium Seat Stand - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Reserved Ribbon Tag concept with #065F46 palette. Minimalist icon.", "palette": [{"hex": "#065F46", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "96", "name": "Zen Hourglass Plate", "appName": "Yoyaku", "tagline": "Hourglass Plated Timepiece", "logoFn": "LogoYoyakuConcept4", "accentColor": "#18181B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Hourglass silhouette integrated into circular plate. - Zen Hourglass Plate design for Yoyaku.", "rationale": "Timed Booking Precision - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Zen Hourglass Plate concept with #18181B palette. Minimalist icon.", "palette": [{"hex": "#18181B", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "97", "name": "Paper Crane Arrival", "appName": "Yoyaku", "tagline": "Origami Crane with Fork", "logoFn": "LogoYoyakuConcept5", "accentColor": "#0D9488", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Origami crane carrying fork in beak for punctual arrival. - Paper Crane Arrival design for Yoyaku.", "rationale": "Japanese Hospitality - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Paper Crane Arrival concept with #0D9488 palette. Minimalist icon.", "palette": [{"hex": "#0D9488", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "98", "name": "Target Confirmation", "appName": "Yoyaku", "tagline": "Concentric Confirmation Rings", "logoFn": "LogoYoyakuConcept6", "accentColor": "#2563EB", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "3 target rings with checkmark arc for 100% booking. - Target Confirmation design for Yoyaku.", "rationale": "Instant Confirmation - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Target Confirmation concept with #2563EB palette. Minimalist icon.", "palette": [{"hex": "#2563EB", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "99", "name": "Ticket Stub Monogram", "appName": "Yoyaku", "tagline": "Notched Ticket Stub Y", "logoFn": "LogoYoyakuConcept7", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Concert-style reservation ticket stub with Y notch. - Ticket Stub Monogram design for Yoyaku.", "rationale": "VIP Pass Ticket - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Ticket Stub Monogram concept with #D97706 palette. Minimalist icon.", "palette": [{"hex": "#D97706", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "100", "name": "Overlapping Dials", "appName": "Yoyaku", "tagline": "Dual Wireframe Clocks", "logoFn": "LogoYoyakuConcept8", "accentColor": "#4F46E5", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Two overlapping thin wireframe clock faces highlighting slot. - Overlapping Dials design for Yoyaku.", "rationale": "Synchronized Dining - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Overlapping Dials concept with #4F46E5 palette. Minimalist icon.", "palette": [{"hex": "#4F46E5", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "101", "name": "Architectural Tent", "appName": "Yoyaku", "tagline": "Triangular Table Tent", "logoFn": "LogoYoyakuConcept9", "accentColor": "#B45309", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Crisp triangular table tent card with glowing apex point. - Architectural Tent design for Yoyaku.", "rationale": "Reserved Table Tent - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Architectural Tent concept with #B45309 palette. Minimalist icon.", "palette": [{"hex": "#B45309", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "102", "name": "Y Spatial Grid", "appName": "Yoyaku", "tagline": "Isometric Y Table Top", "logoFn": "LogoYoyakuConcept10", "accentColor": "#1D4ED8", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "3D isometric dining table top shaped like letter Y. - Y Spatial Grid design for Yoyaku.", "rationale": "Spatial Floor Plan - Clean vector brand identity concept for Yoyaku.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Yoyaku. Y Spatial Grid concept with #1D4ED8 palette. Minimalist icon.", "palette": [{"hex": "#1D4ED8", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#1E3A8A", "name": "Brand Base", "role": "Typography"}, {"hex": "#F0F9FF", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "103", "name": "Imperial Kamon Crest", "appName": "Kaiseki", "tagline": "Kamon Family Crest K", "logoFn": "LogoKaisekiConcept1", "accentColor": "#D97706", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Circular Kamon emblem with 3 stacked course trays K. - Imperial Kamon Crest design for Kaiseki.", "rationale": "Imperial Fine Dining - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Imperial Kamon Crest concept with #D97706 palette. Minimalist icon.", "palette": [{"hex": "#D97706", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "104", "name": "Multi-Course Stack", "appName": "Kaiseki", "tagline": "5 Lacquer Course Bars", "logoFn": "LogoKaisekiConcept2", "accentColor": "#991B1B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "5 horizontal precision lacquer red bars in course order. - Multi-Course Stack design for Kaiseki.", "rationale": "Multi-Course Progression - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Multi-Course Stack concept with #991B1B palette. Minimalist icon.", "palette": [{"hex": "#991B1B", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "105", "name": "Sakura Plating Ring", "appName": "Kaiseki", "tagline": "Botanical Sakura Petal Plate", "logoFn": "LogoKaisekiConcept3", "accentColor": "#F472B6", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Single Sakura petal on porcelain plating ring. - Sakura Plating Ring design for Kaiseki.", "rationale": "Seasonal Japanese Culinary - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Sakura Plating Ring concept with #F472B6 palette. Minimalist icon.", "palette": [{"hex": "#F472B6", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "106", "name": "Golden Fan Banquet", "appName": "Kaiseki", "tagline": "Folding Fan Banquet Arch", "logoFn": "LogoKaisekiConcept4", "accentColor": "#B45309", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Japanese folding fan forming arch above dining table line. - Golden Fan Banquet design for Kaiseki.", "rationale": "Traditional Banquet - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Golden Fan Banquet concept with #B45309 palette. Minimalist icon.", "palette": [{"hex": "#B45309", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "107", "name": "Zen Stone Balance", "appName": "Kaiseki", "tagline": "Balanced River Stones", "logoFn": "LogoKaisekiConcept5", "accentColor": "#52525B", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "3 balanced smooth river stones for food harmony. - Zen Stone Balance design for Kaiseki.", "rationale": "Zen Culinary Harmony - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Zen Stone Balance concept with #52525B palette. Minimalist icon.", "palette": [{"hex": "#52525B", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "108", "name": "Omotenashi Offering", "appName": "Kaiseki", "tagline": "Open Hand Offering Bowl", "logoFn": "LogoKaisekiConcept6", "accentColor": "#BE123C", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Continuous line open hand offering a Kaiseki bowl. - Omotenashi Offering design for Kaiseki.", "rationale": "Respectful Hospitality - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Omotenashi Offering concept with #BE123C palette. Minimalist icon.", "palette": [{"hex": "#BE123C", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "109", "name": "Wireframe Crane", "appName": "Kaiseki", "tagline": "Gold Wire Crane Holder", "logoFn": "LogoKaisekiConcept7", "accentColor": "#CA8A04", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Gold wireframe paper crane serving place-card holder. - Wireframe Crane design for Kaiseki.", "rationale": "Exclusive VIP Dining - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Wireframe Crane concept with #CA8A04 palette. Minimalist icon.", "palette": [{"hex": "#CA8A04", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "110", "name": "Seigaiha Wave", "appName": "Kaiseki", "tagline": "Ocean Wave Full Moon", "logoFn": "LogoKaisekiConcept8", "accentColor": "#1E3A8A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Golden full moon rising over bowl-shaped waves. - Seigaiha Wave design for Kaiseki.", "rationale": "Heritage Japanese Sea - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Seigaiha Wave concept with #1E3A8A palette. Minimalist icon.", "palette": [{"hex": "#1E3A8A", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "111", "name": "Bamboo Leaf Rest", "appName": "Kaiseki", "tagline": "Bamboo Leaf Hashioki K", "logoFn": "LogoKaisekiConcept9", "accentColor": "#16A34A", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "Bamboo leaf wrapped into chopstick rest shape K. - Bamboo Leaf Rest design for Kaiseki.", "rationale": "Natural Chopstick Rest - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Bamboo Leaf Rest concept with #16A34A palette. Minimalist icon.", "palette": [{"hex": "#16A34A", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "112", "name": "Jyubako Bento Matrix", "appName": "Kaiseki", "tagline": "3x3 Jyubako Box Grid", "logoFn": "LogoKaisekiConcept10", "accentColor": "#3B0764", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "3x3 bento box grid with negative space fork. - Jyubako Bento Matrix design for Kaiseki.", "rationale": "Modular Multi-Course - Clean vector brand identity concept for Kaiseki.", "typography": "Modern Sans & Mono — Plus Jakarta Sans / DM Mono. Clean geometry.", "prompt": "Professional vector logo design for Kaiseki. Jyubako Bento Matrix concept with #3B0764 palette. Minimalist icon.", "palette": [{"hex": "#3B0764", "name": "Primary Accent", "role": "Main mark"}, {"hex": "#D97706", "name": "Brand Base", "role": "Typography"}, {"hex": "#FFFBEB", "name": "Background Tint", "role": "App icon background"}, {"hex": "#18181B", "name": "Dark Neutral", "role": "Container contrast"}], "creator": "SHL"}, {"id": "YMM-01", "name": "Handshake Plate", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_01", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-02", "name": "Mortar Pestle Chili", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_02", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-03", "name": "Compass Fork", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_03", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-04", "name": "Lotus Bowl", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_04", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-05", "name": "Reserved Stamp", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_05", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-06", "name": "Magnifying Glass Star", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_06", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-07", "name": "Clock Search Utensils", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_07", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-08", "name": "Knotted Thread", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_08", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-09", "name": "Stacked Stones", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_09", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-10", "name": "Ferry Boat", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_10", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-11", "name": "Plate Utensils Check", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_11", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-12", "name": "Gift Box Dar", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_12", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-13", "name": "Target Dining Crosshair", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_13", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-14", "name": "Directional Signpost", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_14", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-15", "name": "Heart Plate Fork Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_15", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-16", "name": "Location Pin Plate Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_16", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-17", "name": "Calendar Search Utensils", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_17", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-18", "name": "Yin Yang Dish Utensil", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_18", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-19", "name": "Binoculars Utensils", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_19", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-20", "name": "Swirl Utensils Plate Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_20", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-21", "name": "Camera Aperture Utensils", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_21", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-22", "name": "Banana Leaf Curry Fork", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_22", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-23", "name": "Crossed Utensils Q Plate", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_23", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-24", "name": "Karaweik Royal Bird Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_24", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-25", "name": "Myanmar Lantern Fork", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_25", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-26", "name": "Checkmark Q Plate", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_26", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-27", "name": "Pathein Umbrella Dining", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_27", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "YMM-28", "name": "Search Utensils Calendar", "appName": "DineQ", "tagline": "", "logoFn": "LogoYMM_28", "creator": "YMM", "accentColor": "#E11D48", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-01", "name": "Concept 1 Elegant Cloche Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_01", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-02", "name": "Concept 10 Cloche Void Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_02", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-03", "name": "Concept 2 Monogram Fork Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_03", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-04", "name": "Concept 3 Service Bell Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_04", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-05", "name": "Concept 4 Reservation Check Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_05", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-06", "name": "Concept 5 Architectural Dining Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_06", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-07", "name": "Concept 6 Negative Space Q Emblem", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_07", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-08", "name": "Concept 7 Discovery Pin Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_08", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-09", "name": "Concept 8 Structural Table D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_09", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-10", "name": "Concept 9 Excellence Spark Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_10", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-11", "name": "Dineq Concept 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_11", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-12", "name": "Dineq Concept 1 Checkmark Q 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_12", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-13", "name": "Dineq Concept 1 Checkmark Q 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_13", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-14", "name": "Dineq Concept 1 Geometric D Table", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_14", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-15", "name": "Dineq Concept 1 Precision Booking", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_15", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-16", "name": "Dineq Concept 10", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_16", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-17", "name": "Dineq Concept 10 Communication Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_17", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-18", "name": "Dineq Concept 10 Furniture Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_18", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-19", "name": "Dineq Concept 10 Structural Elegance", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_19", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-20", "name": "Dineq Concept 10 Table Chairs Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_20", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-21", "name": "Dineq Concept 11", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_21", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-22", "name": "Dineq Concept 12", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_22", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-23", "name": "Dineq Concept 13", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_23", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-24", "name": "Dineq Concept 14", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_24", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-25", "name": "Dineq Concept 15", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_25", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-26", "name": "Dineq Concept 16", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_26", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-27", "name": "Dineq Concept 17", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_27", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-28", "name": "Dineq Concept 18", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_28", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-29", "name": "Dineq Concept 19", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_29", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-30", "name": "Dineq Concept 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_30", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-31", "name": "Dineq Concept 2 Q Location Pin", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_31", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-32", "name": "Dineq Concept 2 Responsive Service", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_32", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-33", "name": "Dineq Concept 2 Service Bell Q 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_33", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-34", "name": "Dineq Concept 2 Service Bell Q 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_34", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-35", "name": "Dineq Concept 20", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_35", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-36", "name": "Dineq Concept 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_36", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-37", "name": "Dineq Concept 3 Culinary Anchor", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_37", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-38", "name": "Dineq Concept 3 Dining D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_38", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-39", "name": "Dineq Concept 3 Dq Plate Monogram", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_39", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-40", "name": "Dineq Concept 3 Fork Plate D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_40", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-41", "name": "Dineq Concept 4", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_41", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-42", "name": "Dineq Concept 4 Clock Plate", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_42", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-43", "name": "Dineq Concept 4 Reserved Space", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_43", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-44", "name": "Dineq Concept 4 Table Monogram 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_44", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-45", "name": "Dineq Concept 4 Table Monogram 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_45", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-46", "name": "Dineq Concept 5", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_46", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-47", "name": "Dineq Concept 5 Checkmark Void Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_47", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-48", "name": "Dineq Concept 5 Reservation Bell", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_48", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-49", "name": "Dineq Concept 5 Seamless Connection", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_49", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-50", "name": "Dineq Concept 5 Smart Check Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_50", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-51", "name": "Dineq Concept 6", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_51", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-52", "name": "Dineq Concept 6 Bell Button D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_52", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-53", "name": "Dineq Concept 6 Bell Stem D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_53", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-54", "name": "Dineq Concept 6 Calendar D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_54", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-55", "name": "Dineq Concept 6 Instant Reservation", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_55", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-56", "name": "Dineq Concept 7 Chair Table Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_56", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-57", "name": "Dineq Concept 7 Dining Discovery", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_57", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-58", "name": "Dineq Concept 7 Interlocking Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_58", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-59", "name": "Dineq Concept 7 Interlocking Plates", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_59", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-60", "name": "Dineq Concept 8", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_60", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-61", "name": "Dineq Concept 8 Discovery Pin Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_61", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-62", "name": "Dineq Concept 8 Discovery Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_62", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-63", "name": "Dineq Concept 8 Fork Stem D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_63", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-64", "name": "Dineq Concept 8 Trusted Booking", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_64", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-65", "name": "Dineq Concept 9", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_65", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-66", "name": "Dineq Concept 9 Discovery Search Plate", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_66", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-67", "name": "Dineq Concept 9 Premium Excellence", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_67", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-68", "name": "Dineq Concept 9 Premium Spark", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_68", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-69", "name": "Dineq Concept 9 Premium Spark Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_69", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-70", "name": "Dineq 1 Checkmark Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_70", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-71", "name": "Dineq 10 Furniture Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_71", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-72", "name": "Dineq 2 Service Bell Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_72", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-73", "name": "Dineq 3 Spark Monogram", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_73", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-74", "name": "Dineq 4 Discovery Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_74", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-75", "name": "Dineq 5 Interlocking Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_75", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-76", "name": "Dineq 6 Bell Button D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_76", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-77", "name": "Dineq 7 Void Checkmark Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_77", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-78", "name": "Dineq 8 Table Monogram", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_78", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-79", "name": "Dineq 9 Fork Plate D", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_79", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-80", "name": "Dineq Concept 1 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_80", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-81", "name": "Dineq Concept 1 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_81", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-82", "name": "Dineq Concept 1 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_82", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-83", "name": "Dineq Concept 10 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_83", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-84", "name": "Dineq Concept 10 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_84", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-85", "name": "Dineq Concept 10 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_85", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-86", "name": "Dineq Concept 2 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_86", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-87", "name": "Dineq Concept 2 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_87", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-88", "name": "Dineq Concept 2 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_88", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-89", "name": "Dineq Concept 3 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_89", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-90", "name": "Dineq Concept 3 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_90", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-91", "name": "Dineq Concept 3 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_91", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-92", "name": "Dineq Concept 4 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_92", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-93", "name": "Dineq Concept 4 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_93", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-94", "name": "Dineq Concept 4 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_94", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-95", "name": "Dineq Concept 5 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_95", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-96", "name": "Dineq Concept 5 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_96", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-97", "name": "Dineq Concept 5 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_97", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-98", "name": "Dineq Concept 6 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_98", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-99", "name": "Dineq Concept 6 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_99", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-100", "name": "Dineq Concept 7 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_100", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-101", "name": "Dineq Concept 7 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_101", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-102", "name": "Dineq Concept 7 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_102", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-103", "name": "Dineq Concept 8 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_103", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-104", "name": "Dineq Concept 8 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_104", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-105", "name": "Dineq Concept 8 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_105", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-106", "name": "Dineq Concept 9 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_106", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-107", "name": "Dineq Concept 9 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_107", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-108", "name": "Dineq Var 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_108", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-109", "name": "Dineq Var 10", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_109", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-110", "name": "Dineq Var 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_110", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-111", "name": "Dineq Var 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_111", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-112", "name": "Dineq Var 4", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_112", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-113", "name": "Dineq Var 5", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_113", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-114", "name": "Dineq Var 6", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_114", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-115", "name": "Dineq Var 7", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_115", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-116", "name": "Dineq Var 8", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_116", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-117", "name": "Dineq Var 9", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_117", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-118", "name": "Dineq Luxury Concept 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_118", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-119", "name": "Dineq Luxury Concept 10", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_119", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-120", "name": "Dineq Luxury Concept 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_120", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-121", "name": "Dineq Luxury Concept 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_121", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-122", "name": "Dineq Luxury Concept 4", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_122", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-123", "name": "Dineq Luxury Concept 5", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_123", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-124", "name": "Dineq Luxury Concept 6", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_124", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-125", "name": "Dineq Luxury Concept 7", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_125", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-126", "name": "Dineq Luxury Concept 8", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_126", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-127", "name": "Dineq Luxury Concept 9", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_127", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-128", "name": "Dineq Tech Concept 1 Geometric Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_128", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-129", "name": "Dineq Tech Concept 2 Interlocking Dq", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_129", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-130", "name": "Dineq Tech Concept 3 The Reserved Spot", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_130", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-131", "name": "Dineq Tech Concept 4 Location Pin D Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_131", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-132", "name": "Dineq Tech Concept 5 Signal Q", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_132", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-133", "name": "Monochrome Concept 1", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_133", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-134", "name": "Monochrome Concept 10", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_134", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-135", "name": "Monochrome Concept 2", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_135", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-136", "name": "Monochrome Concept 3", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_136", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-137", "name": "Monochrome Concept 4", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_137", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-138", "name": "Monochrome Concept 5", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_138", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-139", "name": "Monochrome Concept 6", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_139", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-140", "name": "Monochrome Concept 7", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_140", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-141", "name": "Monochrome Concept 8", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_141", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}, {"id": "PZCW-142", "name": "Monochrome Concept 9", "appName": "DineQ", "tagline": "", "logoFn": "LogoPZCW_142", "creator": "PZCW", "accentColor": "#0284C7", "recommended": false, "isTopPick": false, "recommendationReason": "", "visual": "", "rationale": "", "typography": "", "prompt": "", "style": "Logo Mark", "palette": []}];

const BRAND_TABS=["ALL","⭐ RECOMMENDED","❤️ FAVORITES","ChateMal","SarMal","Chein","DineQ","Shoku","Yoyaku","Kaiseki","Taberu","We Kanpai","DineReserve","TableHop","ClickToTable","TheVelvetTable","TasteTime","Fork&File","PlateLog","YumSpot","ကြိုဦး (Kyo Oo)","စားပွဲ (Sar Pwe)","NayYar","SaBweh","BookSar","DineFlow","ReserveHub","TableFlow","DineSuite","RestaurantOS"];

const LOGO_STYLES=["Abstract","Mascot","Emblem","Corporate","Wordmark","Vintage","Classic"];

const BRAND_KEYWORDS = {
  'SarMal': ['sarmal','sar mal','orbit plate','clockset','spiral bowl','hex badge','star'],
  'ChateMal': ['chatemal','chate mal','chat feast','chatbubble','chat bubble','arch door','editorial'],
  'Chein': ['chein','link dine','tine links','fork'],
  'DineQ': ['dineq','dine q','precision q','fresh icon'],
  'Shoku': ['shoku'],
  'Yoyaku': ['yoyaku'],
  'Kaiseki': ['kaiseki','jyubako','bento'],
  'Taberu': ['taberu'],
  'We Kanpai': ['we kanpai','kanpai'],
  'DineReserve': ['dinereserve','dine reserve'],
  'TableHop': ['tablehop','table hop'],
  'ClickToTable': ['clicktotable','click to table'],
  'TheVelvetTable': ['thevelvettable','velvet table'],
  'TasteTime': ['tastetime','taste time'],
  'Fork&File': ['fork&file','fork file','fork and file'],
  'PlateLog': ['platelog','plate log'],
  'YumSpot': ['yumspot','yum spot'],
  'NayYar': ['nayyar','nay yar'],
  'SaBweh': ['sabweh','sa bweh'],
  'BookSar': ['booksar','book sar'],
  'DineFlow': ['dineflow','dine flow'],
  'ReserveHub': ['reservehub','reserve hub'],
  'TableFlow': ['tableflow','table flow'],
  'DineSuite': ['dinesuite','dine suite'],
  'RestaurantOS': ['restaurantos','restaurant os']
};

function inferAppName(conceptName) {
  if (!conceptName) return 'DineQ';
  const lower = conceptName.toLowerCase();
  for (const [brand, keywords] of Object.entries(BRAND_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return brand;
    }
  }
  return 'DineQ';
}

var ScreenLogoConcepts = (() => {
  let selectedBrand = 'ALL';
  let selectedStyles = [];
  let selectedCreator = '';
  let searchQuery = '';
  let activeId = null;
  let scrollBeforeDetail = 0;
  let favorites = [];
  let compareIds = [];
  let isCompareOpen = false;
  let mockupMode = 'icon';
  let isMdcrTheme = false;

  let isUploadModalOpen = false;
  let isUploading = false;
  let isUploadSuccess = false;
  let uploadProgress = { current: 0, total: 0, currentFileName: '', percent: 0 };
  let uploadStatusMsg = '';
  let uploadedResultsList = [];
  let uploadForm = {
    creator: 'CT',
    appName: 'DineQ',
    files: [],
    githubToken: localStorage.getItem('ez_github_token') || ''
  };

  let deleteTargetConcept = null;
  let isDeleteModalOpen = false;
  let isDeleting = false;
  let deleteStatusMsg = '';

  function escapeStr(s) { if (!s) return ''; return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;'); }

  function getConceptStyle(c) { return c.style || 'Abstract'; }
  function getCreator(c) { return c.creator || 'SHL'; }

  function getConceptNumber(c) {
    if (!c || !c.id) return 0;
    const match = String(c.id).match(/(\d+)/g);
    if (match && match.length > 0) {
      return parseInt(match[match.length - 1], 10) || 0;
    }
    return 0;
  }

  function sortConcepts(list) {
    return [...list].sort((a, b) => {
      const isUploadedA = (a.style === 'Uploaded' || String(a.id).includes('-')) ? 1 : 0;
      const isUploadedB = (b.style === 'Uploaded' || String(b.id).includes('-')) ? 1 : 0;

      if (isUploadedA !== isUploadedB) {
        return isUploadedB - isUploadedA;
      }

      if (a.timestamp && b.timestamp && a.timestamp !== b.timestamp) {
        return b.timestamp - a.timestamp;
      }

      const numA = getConceptNumber(a);
      const numB = getConceptNumber(b);

      if (numA !== numB) {
        return numB - numA;
      }

      return String(b.id).localeCompare(String(a.id));
    });
  }

  function getFiltered() {
    let list = CONCEPTS.filter(c => c && !isDeletedConcept(c.id, c.logoFn, c.fileName));
    if (selectedBrand === '\u2B50 RECOMMENDED') list = list.filter(c => c.recommended);
    else if (selectedBrand === '\u2764\uFE0F FAVORITES') list = list.filter(c => favorites.includes(c.id));
    else if (selectedBrand !== 'ALL') list = list.filter(c => c.appName === selectedBrand);
    if (selectedStyles.length > 0) list = list.filter(c => selectedStyles.includes(getConceptStyle(c)));
    if (selectedCreator) list = list.filter(c => getCreator(c) === selectedCreator);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.appName.toLowerCase().includes(q) ||
        c.id.includes(q) ||
        getConceptStyle(c).toLowerCase().includes(q) ||
        c.visual.toLowerCase().includes(q) ||
        c.rationale.toLowerCase().includes(q) ||
        getCreator(c).toLowerCase().includes(q)
      );
    }
    return sortConcepts(list);
  }

  function getActive() {
    if (activeId) return CONCEPTS.find(c => c.id === activeId);
    return null;
  }

  function toggleFavorite(e, id) {
    e.stopPropagation();
    if (favorites.includes(id)) favorites = favorites.filter(i => i !== id);
    else favorites.push(id);
    render();
  }

  function toggleCompare(e, id) {
    e.stopPropagation();
    if (compareIds.includes(id)) compareIds = compareIds.filter(i => i !== id);
    else if (compareIds.length >= 3) { compareIds = compareIds.slice(1); compareIds.push(id); }
    else compareIds.push(id);
    render();
  }

  function getCanvasBg() {
    return '#FAF9F8';
  }

  function getCanvasTextColor() {
    return '#1C1917';
  }

  function renderHeader() {
    const activeConcepts = CONCEPTS.filter(c => c && !isDeletedConcept(c.id, c.logoFn, c.fileName));
    return `
      <div style="padding:40px 24px 20px;max-width:1400px;margin:0 auto;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:6px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
            <h1 style="font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-size:32px;font-weight:800;color:#1C1917;margin:0;letter-spacing:-0.02em;">Logo Concepts</h1>
            <span style="background:linear-gradient(135deg,#131546,#1e1b4b);color:#fff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;letter-spacing:0.05em;">${activeConcepts.length} IDEAS</span>
          </div>
          <button onclick="ScreenLogoConcepts.openUploadModal()" style="display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;border-radius:12px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter', sans-serif;box-shadow:0 4px 12px rgba(37,99,235,0.25);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 16px rgba(37,99,235,0.35)'" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 12px rgba(37,99,235,0.25)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload Logo Concept
          </button>
        </div>
        <p style="color:#78716c;font-size:15px;margin:0 0 24px;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">Curated minimalist logo concepts for 27 restaurant service brands</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
          ${BRAND_TABS.map(tab => {
            const isActive = selectedBrand === tab;
            let count = 0;
            if (tab === 'ALL') count = activeConcepts.length;
            else if (tab === '\u2B50 RECOMMENDED') count = activeConcepts.filter(c => c.recommended).length;
            else if (tab === '\u2764\uFE0F FAVORITES') count = favorites.length;
            else count = activeConcepts.filter(c => c.appName === tab).length;
            return `<button onclick="ScreenLogoConcepts.setBrand('${tab}')" style="background:${isActive ? 'linear-gradient(135deg,#131546,#1e1b4b)' : '#fff'};color:${isActive ? '#fff' : '#374151'};border:1px solid ${isActive ? 'transparent' : '#e5e7eb'};border-radius:20px;padding:7px 16px;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.2s;box-shadow:${isActive ? '0 2px 8px rgba(19,21,70,0.25)' : '0 1px 2px rgba(0,0,0,0.05)'};">${tab} <span style="opacity:${isActive ? '0.8' : '0.6'};font-weight:600;">${count}</span></button>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderSearchAndFilters() {
    const filtered = getFiltered();
    const activeConcepts = CONCEPTS.filter(c => c && !isDeletedConcept(c.id, c.logoFn, c.fileName));
    return `
      <div style="padding:0 24px;max-width:1400px;margin:0 auto;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
          <h2 style="font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-size:20px;font-weight:700;color:#1C1917;margin:0;flex-shrink:0;">
            ${selectedBrand === 'ALL' ? 'All Concepts' : selectedBrand === '\u2B50 RECOMMENDED' ? 'AI Recommended' : selectedBrand === '\u2764\uFE0F FAVORITES' ? 'Saved Favorites' : selectedBrand}
            <span style="font-size:14px;font-weight:500;color:#9ca3af;margin-left:8px;">${filtered.length}</span>
          </h2>
          <div style="flex:1;min-width:220px;max-width:360px;position:relative;">
            <svg style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#9ca3af;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search by name, tagline, style, creator..." value="${searchQuery}" oninput="ScreenLogoConcepts.setSearch(this.value)" style="width:100%;padding:10px 36px 10px 38px;border:1px solid #e5e7eb;border-radius:10px;font-size:13px;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;outline:none;box-sizing:border-box;background:#fff;transition:border-color 0.2s,box-shadow 0.2s;" onfocus="this.style.borderColor='#131546';this.style.boxShadow='0 0 0 3px rgba(19,21,70,0.08)'" onblur="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'">
            ${searchQuery ? `<button onclick="ScreenLogoConcepts.setSearch('')" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:#f3f4f6;border:none;cursor:pointer;color:#6b7280;width:20px;height:20px;border-radius:50%;font-size:12px;display:flex;align-items:center;justify-content:center;">✕</button>` : ''}
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap;">
            ${LOGO_STYLES.map(s => {
              const isActive = selectedStyles.includes(s);
              const count = activeConcepts.filter(c => getConceptStyle(c) === s).length;
              return `<button onclick="ScreenLogoConcepts.toggleStyle('${s}')" style="background:${isActive ? 'linear-gradient(135deg,#131546,#1e1b4b)' : '#f3f4f6'};color:${isActive ? '#fff' : '#6b7280'};border:1px solid ${isActive ? 'transparent' : '#e5e7eb'};border-radius:8px;padding:6px 12px;font-size:11px;font-weight:500;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.15s;">${s} <span style="opacity:0.7;">${count}</span></button>`;
            }).join('')}
            ${selectedStyles.length > 0 ? `<button onclick="ScreenLogoConcepts.clearStyles()" style="background:none;color:#ef4444;border:1px solid #fecaca;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:500;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">Clear</button>` : ''}
          </div>
          <!-- Enhanced Prominent Creator Filter Section -->
          <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg, #f8fafc, #f1f5f9);border:1px solid #cbd5e1;border-radius:12px;padding:6px 12px;box-shadow:0 2px 6px rgba(0,0,0,0.03);flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;color:#1e293b;letter-spacing:0.08em;text-transform:uppercase;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span>Creator / Designer:</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              ${['SHL','YMM','CT','PZCW'].map(cr => {
                const isActive = selectedCreator === cr;
                const count = activeConcepts.filter(c => getCreator(c) === cr).length;
                
                // Colors per creator
                const activeGradients = {
                  'SHL': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  'YMM': 'linear-gradient(135deg, #e11d48, #be123c)',
                  'CT': 'linear-gradient(135deg, #059669, #047857)',
                  'PZCW': 'linear-gradient(135deg, #d97706, #b45309)'
                };
                const activeShadows = {
                  'SHL': '0 4px 12px rgba(29,78,216,0.35)',
                  'YMM': '0 4px 12px rgba(225,29,72,0.35)',
                  'CT': '0 4px 12px rgba(5,150,105,0.35)',
                  'PZCW': '0 4px 12px rgba(217,119,6,0.35)'
                };
                const activeGrad = activeGradients[cr] || 'linear-gradient(135deg,#131546,#1e1b4b)';
                const activeShadow = activeShadows[cr] || '0 4px 12px rgba(19,21,70,0.3)';

                return `<button onclick="ScreenLogoConcepts.toggleCreator('${cr}')" style="display:flex;align-items:center;gap:6px;background:${isActive ? activeGrad : '#fff'};color:${isActive ? '#fff' : '#334155'};border:1px solid ${isActive ? 'transparent' : '#cbd5e1'};border-radius:8px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.2s ease;box-shadow:${isActive ? activeShadow : '0 1px 2px rgba(0,0,0,0.04)'};" onmouseover="if (!${isActive}) { this.style.borderColor='#94a3b8'; this.style.transform='translateY(-1px)'; }" onmouseout="if (!${isActive}) { this.style.borderColor='#cbd5e1'; this.style.transform='none'; }">
                  <span>${cr}</span>
                  <span style="background:${isActive ? 'rgba(255,255,255,0.25)' : '#e2e8f0'};color:${isActive ? '#fff' : '#475569'};font-size:10px;font-weight:800;padding:2px 7px;border-radius:10px;">${count}</span>
                </button>`;
              }).join('')}
              ${selectedCreator ? `<button onclick="ScreenLogoConcepts.clearCreator()" style="background:#fff;color:#ef4444;border:1px solid #fca5a5;border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.04);" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='#fff'">Clear Creator</button>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCardGrid() {
    const filtered = getFiltered();
    if (filtered.length === 0) {
      return `
        <div style="padding:80px 24px;text-align:center;max-width:1400px;margin:0 auto;">
          <div style="width:64px;height:64px;background:#f3f4f6;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 style="font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-size:18px;font-weight:600;color:#1C1917;margin:0 0 8px;">No concepts found</h3>
          <p style="color:#78716c;font-size:13px;">Try adjusting your filters or search terms.</p>
        </div>
      `;
    }

    return `
      <div style="padding:0 24px;max-width:1400px;margin:0 auto;">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">
          ${filtered.map(c => {
            const svg = SVG_MAP[c.logoFn] || '';
            const isFav = favorites.includes(c.id);
            const isCompare = compareIds.includes(c.id);
            return `
              <div onclick="ScreenLogoConcepts.setActive('${c.id}')" style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:14px;cursor:pointer;position:relative;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.04);" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)';this.style.transform='translateY(-2px)';this.style.borderColor='#d1d5db'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.04)';this.style.transform='none';this.style.borderColor='#e5e7eb'">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="background:#f3f4f6;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;color:#475569;">#${c.id}</span>
                    <span style="background:linear-gradient(135deg,#1e293b,#0f172a);color:#fff;font-size:9px;font-weight:800;padding:3px 8px;border-radius:6px;letter-spacing:0.04em;">${getCreator(c)}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;color:#9ca3af;font-weight:600;">${getConceptStyle(c)}</span>
                    <button onclick="event.stopPropagation(); ScreenLogoConcepts.openDeleteModal('${c.id}')" style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;cursor:pointer;font-size:11px;width:26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;transition:all 0.15s;opacity:0.85;" title="Delete Logo from GitHub" onmouseover="this.style.opacity='1';this.style.background='#fee2e2';this.style.transform='scale(1.1)'" onmouseout="this.style.opacity='0.85';this.style.background='#fef2f2';this.style.transform='none'">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    <button onclick="ScreenLogoConcepts.toggleFavorite(event,'${c.id}')" style="background:${isFav ? '#fef2f2' : '#f9fafb'};border:1px solid ${isFav ? '#fecaca' : '#e5e7eb'};cursor:pointer;font-size:12px;width:26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'">${isFav ? '❤️' : '♡'}</button>
                  </div>
                </div>
                <!-- Prominent Brand Name Badge -->
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
                  <span style="background:linear-gradient(135deg,#e0f2fe,#bae6fd);color:#0369a1;border:1px solid #7dd3fc;font-size:11px;font-weight:800;padding:3px 10px;border-radius:8px;display:inline-flex;align-items:center;gap:4px;box-shadow:0 1px 2px rgba(3,105,161,0.08);">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                    <span>${c.appName || 'General'}</span>
                  </span>
                  ${c.recommended ? `<span style="background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;font-size:9px;font-weight:800;padding:3px 8px;border-radius:8px;letter-spacing:0.02em;">${c.isTopPick ? '⭐ TOP PICK' : '⭐ RECOMMENDED'}</span>` : ''}
                </div>
                <div style="width:100%;aspect-ratio:1;margin:0 auto 10px;background:#FAF9F8;border-radius:10px;position:relative;overflow:hidden;padding:8px;box-sizing:border-box;transition:background 0.2s;" onmouseover="this.style.background='#f5f5f4'" onmouseout="this.style.background='#FAF9F8'">
                  ${svg}
                </div>
                <div style="font-size:13px;font-weight:700;color:#0f172a;margin:0 0 2px;line-height:1.3;">${c.name}</div>
                <div style="font-size:11px;font-weight:600;color:#64748b;margin-bottom:6px;display:flex;align-items:center;gap:4px;">
                  <span style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.04em;">For:</span>
                  <span style="color:#0284c7;font-weight:700;">${c.appName || 'General'}</span>
                </div>
                <div style="font-size:11px;color:#78716c;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.5;min-height:32px;">${c.tagline}</div>
                <div style="margin-top:10px;height:2px;background:#f3f4f6;border-radius:1px;"></div>
                <button onclick="ScreenLogoConcepts.toggleCompare(event,'${c.id}')" style="width:100%;margin-top:10px;background:${isCompare ? 'linear-gradient(135deg,#131546,#1e1b4b)' : '#f9fafb'};color:${isCompare ? '#fff' : '#6b7280'};border:1px solid ${isCompare ? 'transparent' : '#e5e7eb'};border-radius:8px;padding:7px 10px;font-size:11px;font-weight:500;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.15s;">${isCompare ? '✓ Comparing' : '+ Compare'}</button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderInspector() {
    const c = getActive();
    if (!c) return '';
    const svg = SVG_MAP[c.logoFn] || '';
    const bg = getCanvasBg();
    const tc = getCanvasTextColor();

    return `
      <div id="concept-inspector" style="position:fixed;inset:0;z-index:5000;background:#fafafa;overflow-y:auto;animation:fadeSlideIn 0.3s ease;">
        <div style="position:sticky;top:0;z-index:10;background:rgba(250,250,250,0.9);backdrop-filter:blur(12px);border-bottom:1px solid #e5e7eb;">
          <div style="max-width:1400px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;gap:16px;">
            <button onclick="ScreenLogoConcepts.closeDetail()" style="display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:500;color:#374151;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.15s;" onmouseover="this.style.borderColor='#d1d5db';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'" onmouseout="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div style="flex:1;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <span style="background:${c.accentColor}15;font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px;color:${c.accentColor};">#${c.id}</span>
              <h1 style="font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-size:22px;font-weight:800;color:#1C1917;margin:0;letter-spacing:-0.01em;">${c.name}</h1>
              ${c.recommended ? `<span style="background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;font-size:10px;font-weight:700;padding:4px 10px;border-radius:8px;">${c.isTopPick ? '⭐ TOP PICK' : '⭐ RECOMMENDED'}</span>` : ''}
              <button onclick="ScreenLogoConcepts.openDeleteModal('${c.id}')" style="background:#fee2e2;color:#dc2626;border:1px solid #fecaca;border-radius:10px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;margin-left:auto;" onmouseover="this.style.background='#fca5a5'" onmouseout="this.style.background='#fee2e2'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>Delete from GitHub (ဖျက်မည်)</span>
              </button>
            </div>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:8px 14px;text-align:center;">
              <div style="font-size:9px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Style</div>
              <div style="font-size:12px;font-weight:600;color:#1C1917;">${getConceptStyle(c)}</div>
            </div>
          </div>
        </div>

        <div style="max-width:1000px;margin:0 auto;padding:32px 24px 80px;">
          <p style="color:#78716c;font-size:15px;margin:0 0 28px;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.tagline}</p>

          ${c.recommendationReason ? `
            <div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:1px solid #FDE68A;border-radius:14px;padding:18px;margin-bottom:28px;">
              <div style="font-size:10px;font-weight:700;color:#92400E;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">AI Recommendation</div>
              <p style="color:#78350f;font-size:13px;margin:0;line-height:1.6;">${c.recommendationReason}</p>
            </div>
          ` : ''}

          <div style="display:flex;gap:8px;margin-bottom:28px;flex-wrap:wrap;">
            ${['icon','signage','splash','apron'].map(m => {
              const labels = {icon:'App Icon',signage:'Signage',splash:'Splash Screen',apron:'Merch'};
              const icons = {
                icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
                signage:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
                splash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
                apron:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>'
              };
              const isActive = mockupMode === m;
              return `<button onclick="ScreenLogoConcepts.setMockup('${m}')" style="display:flex;align-items:center;gap:6px;background:${isActive ? 'linear-gradient(135deg,#131546,#1e1b4b)' : '#f9fafb'};color:${isActive ? '#fff' : '#6b7280'};border:1px solid ${isActive ? 'transparent' : '#e5e7eb'};border-radius:10px;padding:8px 14px;font-size:12px;font-weight:500;cursor:pointer;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;transition:all 0.15s;">${icons[m]}${labels[m]}</button>`;
            }).join('')}
          </div>

          ${renderMockup(c, svg, bg, tc)}

          <div style="margin-top:28px;">
            <h3 style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Scalability Test</h3>
            <div style="display:flex;align-items:flex-end;gap:16px;background:#f9fafb;border:1px solid #f3f4f6;border-radius:14px;padding:24px;">
              <div style="width:120px;height:120px;background:${bg};border-radius:10px;display:flex;align-items:center;justify-content:center;padding:10px;">${svg}</div>
              <div style="display:flex;gap:14px;align-items:flex-end;">
                <div style="text-align:center;"><div style="width:24px;height:24px;background:${bg};border-radius:4px;display:flex;align-items:center;justify-content:center;padding:2px;">${svg}</div><div style="font-size:9px;color:#9ca3af;margin-top:6px;font-weight:500;">24</div></div>
                <div style="text-align:center;"><div style="width:40px;height:40px;background:${bg};border-radius:6px;display:flex;align-items:center;justify-content:center;padding:3px;">${svg}</div><div style="font-size:9px;color:#9ca3af;margin-top:6px;font-weight:500;">40</div></div>
                <div style="text-align:center;"><div style="width:64px;height:64px;background:${bg};border-radius:8px;display:flex;align-items:center;justify-content:center;padding:5px;">${svg}</div><div style="font-size:9px;color:#9ca3af;margin-top:6px;font-weight:500;">64</div></div>
                <div style="text-align:center;"><div style="width:96px;height:96px;background:${bg};border-radius:10px;display:flex;align-items:center;justify-content:center;padding:7px;">${svg}</div><div style="font-size:9px;color:#9ca3af;margin-top:6px;font-weight:500;">96</div></div>
              </div>
            </div>
          </div>

          <div style="margin-top:28px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;">
            <h3 style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Visual Description</h3>
            <p style="color:#52525b;font-size:14px;line-height:1.7;margin:0;min-height:24px;">${c.visual || ''}</p>
          </div>

          <div style="margin-top:28px;position:relative;background:linear-gradient(135deg,#f9fafb,#f3f4f6);border:1px solid #e5e7eb;border-radius:14px;padding:24px;overflow:hidden;">
            <div style="position:absolute;right:24px;top:50%;transform:translateY(-50%);font-size:120px;font-weight:900;color:rgba(0,0,0,0.02);font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.id}</div>
            <h3 style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;position:relative;">Design Rationale</h3>
            <p style="color:#52525b;font-size:14px;line-height:1.7;margin:0;position:relative;min-height:24px;">${c.rationale || ''}</p>
          </div>

          ${c.palette && c.palette.length > 0 ? `
            <div style="margin-top:28px;">
              <h3 style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Color Palette</h3>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;">
                ${c.palette.map(p => `
                  <div style="display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #f3f4f6;border-radius:10px;padding:12px 14px;">
                    <div style="width:36px;height:36px;border-radius:8px;background:${p.hex};border:1px solid rgba(0,0,0,0.06);flex-shrink:0;box-shadow:0 2px 4px rgba(0,0,0,0.06);"></div>
                    <div>
                      <div style="font-family:monospace;font-size:12px;font-weight:600;color:#1C1917;">${p.hex}</div>
                      <div style="font-size:11px;color:#9ca3af;">${p.name}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top:28px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;">
            <h3 style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Typography</h3>
            <p style="color:#52525b;font-size:14px;line-height:1.6;margin:0;min-height:24px;">${c.typography || ''}</p>
          </div>

          ${c.prompt ? `
            <div style="margin-top:28px;background:#0f0f11;border-radius:16px;padding:24px;color:#FAFAFA;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <span style="font-size:10px;font-weight:700;color:#71717a;letter-spacing:0.1em;text-transform:uppercase;">AI Image Prompt</span>
                <button onclick="ScreenLogoConcepts.copyPrompt(this,'${escapeStr(c.prompt)}')" style="background:#27272a;color:#a1a1aa;border:1px solid #3f3f46;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:500;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='#3f3f46';this.style.color='#fff'" onmouseout="this.style.background='#27272a';this.style.color='#a1a1aa'">Copy</button>
              </div>
              <p style="font-family:monospace;font-size:12px;color:#a1a1aa;margin:0;line-height:1.6;white-space:pre-wrap;">${c.prompt}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function renderMockup(c, svg, bg, tc) {
    if (mockupMode === 'icon') {
      return `
        <div style="background:linear-gradient(180deg,#0f0f11,#18181b);border-radius:18px;padding:28px;position:relative;overflow:hidden;">
          <div style="font-size:10px;font-weight:600;color:#52525b;text-align:center;margin-bottom:16px;letter-spacing:0.1em;text-transform:uppercase;">App Icon Preview</div>
          <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
            <div style="text-align:center;">
              <div style="width:72px;height:72px;border-radius:18px;background:${bg};display:flex;align-items:center;justify-content:center;padding:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);">${svg}</div>
              <div style="font-size:10px;color:#71717a;margin-top:8px;">Light</div>
            </div>
            <div style="text-align:center;">
              <div style="width:72px;height:72px;border-radius:18px;background:#18181B;display:flex;align-items:center;justify-content:center;padding:8px;border:1px solid #27272a;box-shadow:0 4px 20px rgba(0,0,0,0.4);">${svg}</div>
              <div style="font-size:10px;color:#71717a;margin-top:8px;">Dark</div>
            </div>
            <div style="text-align:center;">
              <div style="width:72px;height:72px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center;padding:8px;border:1px solid #e5e7eb;box-shadow:0 4px 20px rgba(0,0,0,0.2);">${svg}</div>
              <div style="font-size:10px;color:#71717a;margin-top:8px;">White</div>
            </div>
          </div>
          <div style="text-align:center;margin-top:16px;"><span style="font-size:14px;color:#d4d4d8;font-weight:600;font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.appName}</span></div>
        </div>
      `;
    }
    if (mockupMode === 'signage') {
      return `
        <div style="background:radial-gradient(ellipse at center,#27272a 0%,#0f0f11 100%);border-radius:18px;padding:48px;text-align:center;position:relative;overflow:hidden;">
          <div style="font-size:10px;font-weight:600;color:#3f3f46;text-align:left;margin-bottom:20px;letter-spacing:0.1em;text-transform:uppercase;">Storefront Signage</div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px 56px;display:inline-block;box-shadow:0 0 80px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.01);">
            <div style="width:88px;height:88px;margin:0 auto 20px;background:${bg};border-radius:14px;display:flex;align-items:center;justify-content:center;padding:10px;box-shadow:0 8px 30px rgba(0,0,0,0.4);">${svg}</div>
            <div style="font-size:22px;font-weight:700;color:#fafafa;letter-spacing:0.04em;font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.appName}</div>
            <div style="font-size:10px;color:#52525b;letter-spacing:0.2em;margin-top:6px;text-transform:uppercase;">Restaurant & Dining</div>
          </div>
        </div>
      `;
    }
    if (mockupMode === 'splash') {
      return `
        <div style="background:linear-gradient(180deg,#0f0f11 0%,${c.accentColor}20 50%,${c.accentColor}40 100%);border-radius:18px;padding:48px;text-align:center;position:relative;overflow:hidden;min-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <div style="font-size:10px;font-weight:600;color:#3f3f46;text-align:left;width:100%;margin-bottom:28px;letter-spacing:0.1em;text-transform:uppercase;">App Splash Screen</div>
          <div style="width:110px;height:110px;background:${bg};border-radius:24px;display:flex;align-items:center;justify-content:center;padding:14px;margin-bottom:24px;box-shadow:0 12px 40px rgba(0,0,0,0.4);">${svg}</div>
          <div style="font-size:28px;font-weight:800;color:#fafafa;letter-spacing:0.02em;font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.appName}</div>
          <div style="font-size:14px;color:#a1a1aa;margin-top:8px;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.tagline}</div>
          <div style="margin-top:28px;width:28px;height:28px;border:2px solid #3f3f46;border-top-color:${c.accentColor};border-radius:50%;animation:spin 1s linear infinite;"></div>
        </div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
      `;
    }
    return `
      <div style="background:linear-gradient(180deg,#0f0f11,#18181b);border-radius:18px;padding:48px;text-align:center;position:relative;overflow:hidden;">
        <div style="font-size:10px;font-weight:600;color:#3f3f46;text-align:left;margin-bottom:20px;letter-spacing:0.1em;text-transform:uppercase;">Staff Merch / Apron</div>
        <div style="background:repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,0.015) 3px,rgba(255,255,255,0.015) 6px);border-radius:16px;padding:32px;display:inline-block;border:1px dashed #3f3f46;">
          <div style="width:72px;height:72px;margin:0 auto 16px;background:${bg};border-radius:14px;display:flex;align-items:center;justify-content:center;padding:8px;box-shadow:0 4px 16px rgba(0,0,0,0.3);">${svg}</div>
          <div style="font-size:16px;font-weight:600;color:#fafafa;font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">${c.appName}</div>
        </div>
      </div>
    `;
  }

  function renderCompareBar() {
    if (compareIds.length === 0) return '';
    return `
      <div style="position:fixed;bottom:28px;right:28px;background:linear-gradient(135deg,#131546,#1e1b4b);color:#fff;border-radius:16px;padding:12px 20px;display:flex;align-items:center;gap:14px;box-shadow:0 12px 40px rgba(19,21,70,0.35);z-index:1000;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:rgba(255,255,255,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">${compareIds.length}</div>
          <span style="font-size:13px;font-weight:500;color:#e2e8f0;">of 3 selected</span>
        </div>
        <div style="width:1px;height:24px;background:rgba(255,255,255,0.15);"></div>
        <button onclick="ScreenLogoConcepts.openCompare()" style="background:#fff;color:#131546;border:none;border-radius:10px;padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='none'">Compare →</button>
        <button onclick="ScreenLogoConcepts.clearCompare()" style="background:rgba(255,255,255,0.1);color:#94a3b8;border:none;border-radius:8px;padding:8px 10px;font-size:12px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.15)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.1)';this.style.color='#94a3b8'">✕</button>
      </div>
    `;
  }

  function renderCompareModal() {
    if (!isCompareOpen || compareIds.length === 0) return '';
    const items = compareIds.map(id => CONCEPTS.find(c => c.id === id)).filter(Boolean);
    return `
      <div onclick="ScreenLogoConcepts.closeCompare()" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.2s ease;">
        <div onclick="event.stopPropagation()" style="background:#fff;border-radius:24px;padding:36px;max-width:1100px;width:100%;max-height:85vh;overflow-y:auto;position:relative;box-shadow:0 25px 80px rgba(0,0,0,0.3);">
          <button onclick="ScreenLogoConcepts.closeCompare()" style="position:absolute;top:20px;right:20px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;width:36px;height:36px;cursor:pointer;font-size:16px;color:#6b7280;transition:all 0.15s;display:flex;align-items:center;justify-content:center;" onmouseover="this.style.background='#fee2e2';this.style.borderColor='#fecaca';this.style.color='#dc2626'" onmouseout="this.style.background='#f3f4f6';this.style.borderColor='#e5e7eb';this.style.color='#6b7280'">✕</button>
          <div style="margin-bottom:28px;">
            <h2 style="font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-size:24px;font-weight:800;color:#1C1917;margin:0 0 6px;">Compare Concepts</h2>
            <p style="font-size:13px;color:#78716c;margin:0;">Side-by-side comparison of ${items.length} selected logos</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:20px;">
            ${items.map(c => `
              <div style="text-align:center;">
                <div style="background:linear-gradient(135deg,#f9fafb,#f3f4f6);border-radius:16px;padding:20px;margin-bottom:16px;">
                  <div style="width:110px;height:110px;margin:0 auto;background:#FAF9F8;border-radius:14px;display:flex;align-items:center;justify-content:center;padding:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">${SVG_MAP[c.logoFn] || ''}</div>
                </div>
                <div style="font-size:14px;font-weight:700;color:#1C1917;margin-bottom:4px;">${c.name}</div>
                <div style="font-size:11px;color:#78716c;margin:0 0 8px;line-height:1.5;">${c.tagline}</div>
                ${c.recommended ? `<div style="font-size:10px;color:#92400e;font-weight:600;background:linear-gradient(135deg,#fef3c7,#fde68a);padding:3px 10px;border-radius:6px;display:inline-block;">${c.isTopPick ? '⭐ TOP PICK' : '⭐ RECOMMENDED'}</div>` : ''}
                ${c.palette && c.palette.length > 0 ? `<div style="display:flex;gap:4px;justify-content:center;margin-top:12px;">${c.palette.slice(0,5).map(p => `<div style="width:22px;height:22px;border-radius:6px;background:${p.hex};border:1px solid rgba(0,0,0,0.08);box-shadow:0 2px 4px rgba(0,0,0,0.08);"></div>`).join('')}</div>` : ''}
                <div style="font-size:11px;color:#78716c;margin-top:12px;line-height:1.5;padding:0 8px;">${c.visual ? c.visual.substring(0, 120) + '...' : ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function updateFileConceptName(fileId, name) {
    const item = uploadForm.files.find(f => f.id === fileId);
    if (item) item.conceptName = name;
  }

  function removeUploadFile(fileId) {
    uploadForm.files = uploadForm.files.filter(f => f.id !== fileId);
    render();
  }

  function clearUploadFiles() {
    uploadForm.files = [];
    render();
  }

  function finishAndCloseUploadModal() {
    isUploadModalOpen = false;
    isUploading = false;
    isUploadSuccess = false;
    uploadProgress = { current: 0, total: 0, currentFileName: '', percent: 0 };
    uploadStatusMsg = '';
    uploadedResultsList = [];
    uploadForm.files = [];
    render();
  }

  function closeUploadModal() {
    if (isUploading) return;
    finishAndCloseUploadModal();
  }

  function getSortedBrandOptions(selectedAppName) {
    const allBrands = BRAND_TABS.filter(b => b !== 'ALL' && !b.startsWith('⭐') && !b.startsWith('❤️'));

    const brandCounts = {};
    allBrands.forEach(b => {
      brandCounts[b] = CONCEPTS.filter(c => c.appName === b).length;
    });

    const sortedBrands = [...allBrands].sort((a, b) => {
      const countA = brandCounts[a] || 0;
      const countB = brandCounts[b] || 0;
      if (countB !== countA) {
        return countB - countA;
      }
      return a.localeCompare(b);
    });

    const currentSelected = selectedAppName || sortedBrands[0];

    return sortedBrands.map(brand => {
      const count = brandCounts[brand] || 0;
      const isSelected = currentSelected === brand;
      const countLabel = count > 0 ? ` (${count})` : '';
      return `<option value="${escapeStr(brand)}" ${isSelected ? 'selected' : ''}>${escapeStr(brand)}${countLabel}</option>`;
    }).join('');
  }

  function renderUploadModal() {
    if (!isUploadModalOpen) return '';
    const fileCount = uploadForm.files.length;

    return `
      <div onclick="ScreenLogoConcepts.closeUploadModal()" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.2s ease;">
        <div onclick="event.stopPropagation()" style="background:#fff;border-radius:24px;padding:32px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 25px 80px rgba(0,0,0,0.3);font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', sans-serif;">
          ${!isUploading ? `<button onclick="ScreenLogoConcepts.closeUploadModal()" style="position:absolute;top:20px;right:20px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;width:36px;height:36px;cursor:pointer;font-size:16px;color:#6b7280;display:flex;align-items:center;justify-content:center;">✕</button>` : ''}
          
          <div style="margin-bottom:24px;">
            <h2 style="font-family:'Outfit', sans-serif;font-size:22px;font-weight:800;color:#1C1917;margin:0 0 4px;">Upload Logo Concept(s)</h2>
            <p style="font-size:13px;color:#6b7280;margin:0;">Select one or multiple PNG / SVG files to commit into your target creator folder.</p>
          </div>

          ${isUploadSuccess ? `
            <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:16px;padding:24px;text-align:center;margin-bottom:12px;box-shadow:0 4px 14px rgba(22,163,74,0.1);">
              <div style="width:52px;height:52px;background:#16a34a;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px;font-weight:bold;">✓</div>
              <h3 style="font-size:18px;font-weight:800;color:#15803d;margin:0 0 6px;font-family:'Outfit', sans-serif;">Upload & Commit Successful!</h3>
              <p style="font-size:13px;color:#166534;margin:0 0 16px;">Committed ${uploadedResultsList.length} logo concept(s) directly to GitHub repository.</p>
              
              <div style="text-align:left;background:#fff;border:1px solid #bbf7d0;border-radius:12px;padding:12px 16px;max-height:160px;overflow-y:auto;margin-bottom:20px;">
                ${uploadedResultsList.map(item => `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0fdf4;font-size:12px;">
                    <span style="font-weight:700;color:#1e293b;">✓ ${item.fileName}</span>
                    <span style="background:#dcfce7;color:#15803d;font-weight:700;padding:2px 8px;border-radius:6px;">${item.newId}</span>
                  </div>
                `).join('')}
              </div>

              <button onclick="ScreenLogoConcepts.finishAndCloseUploadModal()" style="background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;width:100%;box-shadow:0 4px 12px rgba(22,163,74,0.3);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='none'">
                Done — View Logos in Gallery →
              </button>
            </div>
          ` : isUploading ? `
            <div style="background:#f8fafc;border-radius:16px;padding:24px;border:1px solid #e2e8f0;margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;font-weight:700;color:#1e293b;">
                <span>Uploading (${uploadProgress.current}/${uploadProgress.total} files)</span>
                <span style="color:#2563eb;font-weight:800;">${uploadProgress.percent}%</span>
              </div>
              
              <div style="width:100%;height:10px;background:#e2e8f0;border-radius:6px;overflow-hidden;margin-bottom:16px;">
                <div style="width:${uploadProgress.percent}%;height:100%;background:linear-gradient(90deg,#2563eb,#3b82f6);transition:width 0.3s ease;border-radius:6px;"></div>
              </div>

              <div style="font-size:12.5px;color:#475569;display:flex;align-items:center;gap:8px;background:#fff;padding:10px 14px;border-radius:10px;border:1px solid #cbd5e1;">
                <span style="display:inline-block;width:14px;height:14px;border:2px solid #2563eb;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;flex-shrink:0;"></span>
                <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Committing <strong>${uploadProgress.currentFileName}</strong> to GitHub...</span>
              </div>
            </div>
          ` : `
            <form onsubmit="event.preventDefault(); ScreenLogoConcepts.submitUpload();">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div>
                  <label style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:6px;">Target Creator / Logo Folder</label>
                  <select onchange="ScreenLogoConcepts.setUploadField('creator', this.value)" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:10px;font-size:13px;background:#fff;color:#111827;">
                    <option value="CT" ${uploadForm.creator === 'CT' ? 'selected' : ''}>CT (Extracted_CT_Logos)</option>
                    <option value="PZCW" ${uploadForm.creator === 'PZCW' ? 'selected' : ''}>PZCW (Extracted_PZCW_Logos)</option>
                    <option value="SHL" ${uploadForm.creator === 'SHL' ? 'selected' : ''}>SHL (Extracted_SHL_Logos)</option>
                    <option value="YMM" ${uploadForm.creator === 'YMM' ? 'selected' : ''}>YMM (Extracted_YMM_Logos)</option>
                  </select>
                </div>
                <div>
                  <label style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:6px;">Target App Name</label>
                  <select onchange="ScreenLogoConcepts.setUploadField('appName', this.value)" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:10px;font-size:13px;background:#fff;color:#111827;">
                    ${getSortedBrandOptions(uploadForm.appName)}
                  </select>
                </div>
              </div>

              <div style="margin-bottom:16px;">
                <label style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:6px;">Logo File(s) - Select Single or Multiple</label>
                <div style="border:2px dashed #cbd5e1;border-radius:14px;padding:20px;text-align:center;background:#f8fafc;position:relative;">
                  <input type="file" multiple accept=".png,.svg,image/png,image/svg+xml" onchange="ScreenLogoConcepts.handleFileSelect(this)" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;z-index:2;" />
                  <div style="color:#64748b;pointer-events:none;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="margin-bottom:8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <div style="font-size:13px;font-weight:600;color:#334155;">Click or drag & drop PNG or SVG file(s) here</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:4px;">You can select multiple files at once</div>
                  </div>
                </div>
              </div>

              ${fileCount > 0 ? `
                <div style="margin-bottom:16px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                    <span style="font-size:12px;font-weight:700;color:#1e293b;">Selected Files (${fileCount})</span>
                    <button type="button" onclick="ScreenLogoConcepts.clearUploadFiles()" style="background:none;border:none;color:#ef4444;font-size:11px;font-weight:600;cursor:pointer;">Clear All</button>
                  </div>
                  <div style="max-height:220px;overflow-y:auto;padding-right:4px;">
                    ${uploadForm.files.map(f => `
                      <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:8px;">
                        <img src="${f.fileData}" style="width:44px;height:44px;object-fit:contain;background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:2px;flex-shrink:0;" />
                        <div style="flex:1;min-width:0;">
                          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                            <span style="font-size:12px;font-weight:700;color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px;">${escapeStr(f.fileName)}</span>
                            <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:#e2e8f0;color:#475569;text-transform:uppercase;">${f.fileType}</span>
                          </div>
                          <input type="text" value="${escapeStr(f.conceptName)}" oninput="ScreenLogoConcepts.updateFileConceptName('${f.id}', this.value)" placeholder="Concept name..." style="width:100%;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:12px;box-sizing:border-box;" />
                        </div>
                        <button type="button" onclick="ScreenLogoConcepts.removeUploadFile('${f.id}')" style="background:#fee2e2;color:#ef4444;border:none;border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;" title="Remove file">✕</button>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div id="upload-status-msg-container" style="display:${uploadStatusMsg ? 'block' : 'none'};padding:12px 14px;border-radius:10px;font-size:13px;margin-bottom:16px;${uploadStatusMsg.startsWith('Error') || uploadStatusMsg.startsWith('Failed') ? 'background:#fef2f2;color:#dc2626;border:1px solid #fecaca;' : 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;'}" >
                ${uploadStatusMsg}
              </div>

              <div style="display:flex;justify-content:flex-end;gap:10px;">
                <button type="button" onclick="ScreenLogoConcepts.closeUploadModal()" style="background:#f1f5f9;color:#475569;border:none;border-radius:10px;padding:10px 18px;font-size:13px;font-weight:600;cursor:pointer;">Cancel</button>
                <button id="upload-submit-btn" type="submit" ${fileCount === 0 ? 'disabled' : ''} style="background:${fileCount === 0 ? '#94a3b8' : 'linear-gradient(135deg,#131546,#1e1b4b)'};color:#fff;border:none;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:600;cursor:${fileCount === 0 ? 'not-allowed' : 'pointer'};display:flex;align-items:center;gap:8px;">
                  Upload & Commit ${fileCount > 1 ? fileCount + ' Files' : 'Logo'} →
                </button>
              </div>
            </form>
          `}
        </div>
      </div>
    `;
  }

  function handleFileSelect(input) {
    if (!input.files || input.files.length === 0) return;
    const filesArray = Array.from(input.files);
    let loadedCount = 0;

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ').trim();
        uploadForm.files.push({
          id: 'file_' + Math.random().toString(36).substring(2, 9),
          fileData: e.target.result,
          fileName: file.name,
          fileType: file.name.toLowerCase().endsWith('.svg') ? 'svg' : 'png',
          conceptName: cleanName || 'Concept'
        });

        loadedCount++;
        if (loadedCount === filesArray.length) {
          render();
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function showUploadStatus(msg, isError) {
    uploadStatusMsg = msg;
    const statusContainer = document.getElementById('upload-status-msg-container');
    if (statusContainer) {
      statusContainer.style.display = msg ? 'block' : 'none';
      statusContainer.innerHTML = msg;
      if (isError) {
        statusContainer.style.background = '#fef2f2';
        statusContainer.style.color = '#dc2626';
        statusContainer.style.border = '1px solid #fecaca';
      } else {
        statusContainer.style.background = '#f0fdf4';
        statusContainer.style.color = '#16a34a';
        statusContainer.style.border = '1px solid #bbf7d0';
      }
    }
  }

  async function directGitHubUpload({ token, creator, conceptName, appName, fileData, fileType }) {
    const owner = 'mdcrsoehtetlin';
    const repo = 'Booking-Prototype';
    const branch = 'main';

    const creatorKey = (creator || 'CT').toUpperCase().trim();
    const FOLDER_MAP = {
      CT: 'Extracted_CT_Logos',
      PZCW: 'Extracted_PZCW_Logos',
      SHL: 'Extracted_SHL_Logos',
      YMM: 'Extracted_YMM_Logos'
    };

    const targetFolder = FOLDER_MAP[creatorKey] || `Extracted_${creatorKey}_Logos`;

    const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${targetFolder}?ref=${branch}`;
    const listRes = await fetch(contentsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let highestNum = 0;
    if (listRes.ok) {
      const items = await listRes.json();
      if (Array.isArray(items)) {
        items.forEach(item => {
          const match = item.name.match(new RegExp(`${creatorKey}[_-](\\d+)`, 'i'));
          if (match && match[1]) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && num > highestNum) {
              highestNum = num;
            }
          }
        });
      }
    }

    CONCEPTS.forEach(c => {
      if (c.id && c.id.startsWith(creatorKey + '-')) {
        const match = c.id.match(/-(\d+)$/);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > highestNum) {
            highestNum = num;
          }
        }
      }
    });

    const nextNum = highestNum + 1;
    const paddedNum = String(nextNum).padStart(3, '0');

    const cleanAppName = (appName || 'SarMal')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    const cleanConceptName = (conceptName || 'Concept')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    const ext = (fileType || 'png').toLowerCase().includes('svg') ? 'svg' : 'png';
    const fileName = `${creatorKey}_${paddedNum}_${cleanAppName}_${cleanConceptName}_Logo.${ext}`;
    const filePath = `${targetFolder}/${fileName}`;

    let base64Content = fileData;
    if (fileData.includes('base64,')) {
      base64Content = fileData.split('base64,')[1];
    }

    const uploadUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const commitRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Upload logo concept ${fileName} to ${targetFolder}`,
        content: base64Content,
        branch: branch
      })
    });

    const commitData = await commitRes.json();

    if (!commitRes.ok) {
      throw new Error(commitData.message || 'GitHub commit failed');
    }

    return {
      success: true,
      fileName,
      filePath,
      newId: `${creatorKey}-${paddedNum}`,
      logoFn: `Logo${creatorKey}_${paddedNum}`,
      creator: creatorKey,
      appName: appName || 'SarMal',
      conceptName: conceptName || `Concept ${paddedNum}`
    };
  }

  async function submitUpload() {
    if (!uploadForm.files || uploadForm.files.length === 0) {
      showUploadStatus('Error: Please select at least one logo file to upload.', true);
      return;
    }

    isUploading = true;
    isUploadSuccess = false;
    uploadedResultsList = [];
    const totalFiles = uploadForm.files.length;
    uploadProgress = { current: 0, total: totalFiles, currentFileName: uploadForm.files[0].fileName, percent: 0 };
    render();

    const savedToken = localStorage.getItem('ez_github_token') || uploadForm.githubToken;

    for (let i = 0; i < uploadForm.files.length; i++) {
      const currentFile = uploadForm.files[i];
      uploadProgress.current = i + 1;
      uploadProgress.currentFileName = currentFile.fileName;
      uploadProgress.percent = Math.round(((i + 0.2) / totalFiles) * 100);
      render();

      let result = null;
      let responseOk = false;

      // 1. Try Vercel Serverless API first
      try {
        const response = await fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creator: uploadForm.creator,
            conceptName: currentFile.conceptName,
            appName: uploadForm.appName,
            fileData: currentFile.fileData,
            fileType: currentFile.fileType,
            githubToken: savedToken
          })
        });

        if (response.ok) {
          result = await response.json();
          if (result.success) responseOk = true;
        } else if (response.status === 404 || response.status === 405) {
          console.warn('/api/upload-logo not reachable on static dev server. Falling back to direct GitHub API...');
        } else {
          const errJson = await response.json().catch(() => ({}));
          throw new Error(errJson.error || `Server API error (${response.status})`);
        }
      } catch (apiErr) {
        console.warn('API endpoint unavailable:', apiErr);
      }

      // 2. Fallback for localhost (npx serve) if /api endpoint isn't available
      if (!responseOk) {
        let token = savedToken;
        if (!token) {
          token = prompt('Enter your GitHub Personal Access Token (PAT) for local upload:');
          if (token) {
            token = token.trim();
            localStorage.setItem('ez_github_token', token);
            uploadForm.githubToken = token;
          }
        }

        if (token) {
          result = await directGitHubUpload({
            token,
            creator: uploadForm.creator,
            conceptName: currentFile.conceptName,
            appName: uploadForm.appName,
            fileData: currentFile.fileData,
            fileType: currentFile.fileType
          });
          if (result && result.success) responseOk = true;
        } else {
          isUploading = false;
          showUploadStatus('Error: A GitHub Token is required to commit files on localhost.', true);
          render();
          return;
        }
      }

      if (responseOk && result && result.success) {
        SVG_PATH_MAP[result.logoFn] = currentFile.fileData;

        const newConcept = {
          id: result.newId,
          name: currentFile.conceptName || result.conceptName,
          appName: uploadForm.appName,
          tagline: `${uploadForm.creator} extracted concept`,
          logoFn: result.logoFn,
          accentColor: '#2563EB',
          recommended: false,
          isTopPick: false,
          recommendationReason: '',
          visual: `Uploaded ${result.fileName} into ${result.filePath}`,
          rationale: 'Newly uploaded logo concept committed directly to GitHub repository.',
          typography: '',
          prompt: '',
          palette: [],
          creator: result.creator,
          style: 'Uploaded',
          timestamp: Date.now()
        };

        const existingIdx = CONCEPTS.findIndex(c => c.id === newConcept.id);
        if (existingIdx >= 0) {
          CONCEPTS[existingIdx] = newConcept;
        } else {
          CONCEPTS.unshift(newConcept);
        }

        saveLocalUploadedCache(newConcept, currentFile.fileData);
        uploadedResultsList.push({ fileName: result.fileName, newId: result.newId });

        uploadProgress.percent = Math.round(((i + 1) / totalFiles) * 100);
        render();
      } else {
        isUploading = false;
        showUploadStatus(`Failed uploading ${currentFile.fileName}: ${result?.error || 'Unknown upload error'}`, true);
        render();
        return;
      }
    }

    isUploading = false;
    isUploadSuccess = true;
    render();
  }

  async function directGitHubDelete({ token, filePath, creator, fileName }) {
    const owner = 'mdcrsoehtetlin';
    const repo = 'Booking-Prototype';
    const branch = 'main';

    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(fileUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      const errData = await getRes.json().catch(() => ({}));
      throw new Error(errData.message || `File not found on GitHub (${filePath})`);
    }

    const fileInfo = await getRes.json();
    const sha = fileInfo.sha;

    const deleteRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Delete logo concept ${fileName || filePath}`,
        sha: sha,
        branch: branch
      })
    });

    if (!deleteRes.ok) {
      const errData = await deleteRes.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to delete file from GitHub');
    }

    return { success: true };
  }

  async function doConfirmDeleteLogo() {
    if (!deleteTargetConcept) return;

    const c = deleteTargetConcept;
    isDeleting = true;
    deleteStatusMsg = '';
    render();

    // 1. Mark as deleted in remoteDeletedLogos in-memory IMMEDIATELY (instant hide for this user)
    const deletedKeys = markLogoAsDeleted(c);

    // 2. Remove concept from memory array & SVG maps IMMEDIATELY
    CONCEPTS = CONCEPTS.filter(item => item && String(item.id) !== String(c.id) && item.logoFn !== c.logoFn);
    delete SVG_PATH_MAP[c.logoFn];
    delete SVG_FALLBACK_MAP[c.logoFn];

    // Purge concept from localStorage uploaded cache
    let cache = getLocalUploadedCache();
    cache = cache.filter(item => item && item.concept && String(item.concept.id) !== String(c.id) && item.concept.logoFn !== c.logoFn);
    try {
      localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(cache));
    } catch (_e) {}

    // 3. Close modal and refresh UI so the card vanishes INSTANTLY for the deleting user
    isDeleting = false;
    isDeleteModalOpen = false;
    deleteTargetConcept = null;
    deleteStatusMsg = '';
    activeId = null;
    render();

    // 4. Fire real GitHub deletion + deleted-logos.json update asynchronously
    (async () => {
      const creatorKey = getCreator(c);
      const FOLDER_MAP = {
        CT: 'Extracted_CT_Logos',
        PZCW: 'Extracted_PZCW_Logos',
        SHL: 'Extracted_SHL_Logos',
        YMM: 'Extracted_YMM_Logos'
      };
      const targetFolder = FOLDER_MAP[creatorKey] || `Extracted_${creatorKey}_Logos`;
      const savedToken = localStorage.getItem('ez_github_token') || uploadForm.githubToken;

      // Build the list of possible file paths to try
      const tryPaths = [];
      if (c.localPath) tryPaths.push(c.localPath);
      if (c.fileName) tryPaths.push(`${targetFolder}/${c.fileName}`);
      if (SVG_PATH_MAP[c.logoFn]) tryPaths.push(SVG_PATH_MAP[c.logoFn]);
      if (SVG_FALLBACK_MAP[c.logoFn]) tryPaths.push(SVG_FALLBACK_MAP[c.logoFn]);
      if (c.fileName) {
        const base = c.fileName.replace(/\.[^.]+$/, '');
        tryPaths.push(`${targetFolder}/${base}.svg`);
        tryPaths.push(`${targetFolder}/${base}.png`);
        tryPaths.push(`${targetFolder}/${base}.jpg`);
      }
      const cleanNum = getConceptNumber(c);
      const paddedNum = String(cleanNum || c.id).padStart(3, '0');
      const genName = `${creatorKey}_${paddedNum}_${(c.appName || 'DineQ').replace(/[^a-zA-Z0-9]/g, '_')}_${(c.name || 'Concept').replace(/[^a-zA-Z0-9]/g, '_')}_Logo`;
      tryPaths.push(`${targetFolder}/${genName}.png`);
      tryPaths.push(`${targetFolder}/${genName}.svg`);
      tryPaths.push(`${targetFolder}/${genName}.jpg`);
      const uniquePaths = [...new Set(tryPaths)].filter(p => p && !p.startsWith('data:'));

      // --- Strategy A: Server-side API (uses GITHUB_TOKEN env var — no client token needed) ---
      let serverSuccess = false;
      for (const p of uniquePaths) {
        try {
          const apiRes = await fetch('/api/delete-logo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              creator: creatorKey,
              fileName: c.fileName,
              filePath: p,
              githubToken: savedToken || undefined,
              deletedKeys: deletedKeys
            })
          });
          if (apiRes.ok) {
            const result = await apiRes.json();
            if (result.success) {
              serverSuccess = true;
              // Only update remoteDeletedLogos if the server list is LONGER than what
              // we already have in memory. Consecutive deletions can cause out-of-order
              // responses where an earlier deletion's response arrives AFTER a later one,
              // which would otherwise roll back keys added by the later deletion.
              if (Array.isArray(result.deletedList) && result.deletedList.length > remoteDeletedLogos.length) {
                remoteDeletedLogos = result.deletedList;
              }
              console.info('[Delete] Server deletion successful:', p);
              break;
            }
          } else if (apiRes.status === 404 || apiRes.status === 405) {
            // API endpoint not deployed (local dev) — skip to fallback
            break;
          }
        } catch (_e) { /* network issue — try next path */ }
      }

      // --- Strategy B: Client-side direct GitHub API (fallback for local dev or API failure) ---
      if (!serverSuccess && savedToken) {
        let clientSuccess = false;
        for (const p of uniquePaths) {
          try {
            await directGitHubDelete({ token: savedToken, filePath: p, creator: creatorKey, fileName: c.fileName });
            clientSuccess = true;
            console.info('[Delete] Client-side deletion successful:', p);
            break;
          } catch (_e) { /* try next path */ }
        }

        // After client-side file delete, also update deleted-logos.json via GitHub API
        if (clientSuccess && deletedKeys && deletedKeys.length > 0) {
          try {
            const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${REMOTE_DELETED_LOGOS_PATH}?ref=${GITHUB_BRANCH}`;
            let sha = null;
            let currentList = [...remoteDeletedLogos];
            const getRes = await fetch(fileUrl, {
              headers: { 'Authorization': `Bearer ${savedToken}`, 'Accept': 'application/vnd.github.v3+json' }
            });
            if (getRes.ok) {
              const fi = await getRes.json();
              sha = fi.sha;
              if (fi.content) {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(fi.content.replace(/\n/g, '')))));
                if (Array.isArray(decoded)) currentList = decoded;
              }
            }
            deletedKeys.forEach(k => {
              const kl = String(k).toLowerCase().trim();
              if (kl && !currentList.includes(kl)) currentList.push(kl);
            });
            const body = {
              message: `Update deleted logos list`,
              content: btoa(unescape(encodeURIComponent(JSON.stringify(currentList, null, 2)))),
              branch: GITHUB_BRANCH
            };
            if (sha) body.sha = sha;
            await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${REMOTE_DELETED_LOGOS_PATH}`, {
              method: 'PUT',
              headers: { 'Authorization': `Bearer ${savedToken}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
              body: JSON.stringify(body)
            });
            remoteDeletedLogos = currentList;
          } catch (_e) {
            console.warn('[Delete] Could not update deleted-logos.json via client token:', _e);
          }
        }

        if (!clientSuccess) {
          console.warn('[Delete] Could not delete file from GitHub. No valid path found or token rejected.');
        }
      }

      if (!serverSuccess && !savedToken) {
        console.warn('[Delete] No GitHub token available. File not deleted from GitHub. Set GITHUB_TOKEN in Vercel env vars.');
      }
    })();
  }

  function doOpenDeleteModal(id) {
    const concept = CONCEPTS.find(item => String(item.id) === String(id));
    if (concept) {
      deleteTargetConcept = concept;
      isDeleteModalOpen = true;
      isDeleting = false;
      deleteStatusMsg = '';
      render();
    }
  }

  function doCloseDeleteModal() {
    isDeleting = false;
    isDeleteModalOpen = false;
    deleteTargetConcept = null;
    deleteStatusMsg = '';
    render();
  }

  function renderDeleteModal() {
    if (!isDeleteModalOpen || !deleteTargetConcept) return '';

    const c = deleteTargetConcept;
    const logoSvg = getSvgImage(c.logoFn);

    return `
      <div onclick="ScreenLogoConcepts.closeDeleteModal()" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:9500;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.2s ease;">
        <div onclick="event.stopPropagation()" style="background:#fff;border-radius:24px;padding:32px;max-width:540px;width:100%;position:relative;box-shadow:0 25px 80px rgba(0,0,0,0.3);font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">
          ${!isDeleting ? `<button onclick="ScreenLogoConcepts.closeDeleteModal()" style="position:absolute;top:20px;right:20px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;width:36px;height:36px;cursor:pointer;font-size:16px;color:#6b7280;display:flex;align-items:center;justify-content:center;">✕</button>` : ''}
          
          <!-- Red Warning Header Banner -->
          <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:16px;padding:20px;margin-bottom:20px;">
            <div style="display:flex;align-items:center;gap:10px;color:#dc2626;font-size:16px;font-weight:800;margin-bottom:8px;font-family:'Outfit', 'Padauk', 'Noto Sans Myanmar', sans-serif;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span>သတိပေးချက် - Logo ဓာတ်ပုံအား အပြီးတိုင် ဖျက်ဆီးမည်</span>
            </div>
            <p style="font-size:13.5px;color:#991b1b;line-height:1.6;margin:0;font-family:'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;font-weight:600;">
              "ဤ Logo Concept ဓာတ်ပုံကို ဖျက်လိုက်ပါက GitHub Repository မှ အပြီးတိုင် ဖျက်ဆီးသွားမည်ဖြစ်ပြီး၊ အခြားသူများထံတွင်လည်း ပျောက်ကွယ်သွားမည်ဖြစ်သည်။ ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြင်ဆင်၍ မရပါ။"
            </p>
            <p style="font-size:11.5px;color:#b91c1c;margin:6px 0 0;font-style:italic;">
              (If deleted, this logo concept will be permanently removed from GitHub repository and will disappear for everyone. This action cannot be undone.)
            </p>
          </div>

          <!-- File Info Card -->
          <div style="display:flex;align-items:center;gap:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;margin-bottom:20px;">
            <div style="width:56px;height:56px;background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
              ${logoSvg}
            </div>
            <div>
              <div style="font-size:14px;font-weight:800;color:#1e293b;">#${c.id} — ${escapeStr(c.name)}</div>
              <div style="font-size:12px;color:#64748b;margin-top:2px;">App: <strong>${escapeStr(c.appName)}</strong> | Creator: <strong>${c.creator}</strong></div>
              <div style="font-size:11px;color:#94a3b8;margin-top:2px;word-break:break-all;">${c.visual || ''}</div>
            </div>
          </div>

          ${deleteStatusMsg ? `
            <div style="padding:12px 14px;border-radius:10px;font-size:13px;margin-bottom:20px;${deleteStatusMsg.startsWith('Error') || deleteStatusMsg.startsWith('Failed') ? 'background:#fef2f2;color:#dc2626;border:1px solid #fecaca;' : 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;'}" >
              ${deleteStatusMsg}
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div style="display:flex;justify-content:flex-end;gap:12px;">
            <button type="button" onclick="ScreenLogoConcepts.closeDeleteModal()" ${isDeleting ? 'disabled' : ''} style="background:#f1f5f9;color:#475569;border:none;border-radius:12px;padding:11px 20px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">
              မဖျက်တော့ပါ (Cancel)
            </button>
            <button type="button" onclick="ScreenLogoConcepts.confirmDeleteLogo()" ${isDeleting ? 'disabled' : ''} style="background:${isDeleting ? '#fca5a5' : 'linear-gradient(135deg,#dc2626,#b91c1c)'};color:#fff;border:none;border-radius:12px;padding:11px 22px;font-size:13px;font-weight:700;cursor:${isDeleting ? 'not-allowed' : 'pointer'};display:flex;align-items:center;gap:8px;font-family:'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;box-shadow:0 4px 14px rgba(220,38,38,0.3);">
              ${isDeleting ? '<span style="display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></span> ဖျက်နေပါသည်...' : 'အပြီးတိုင် ဖျက်မည် (Permanently Delete)'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function render() {
    ensureSvgMapLoaded();
    loadFromLocalUploadedCache();
    if (!uploadedLogosLoaded) {
      loadUploadedLogosFromGitHub().then(() => render());
    }
    const app = document.getElementById('app');
    if (!app) return;

    const mdcrClass = isMdcrTheme ? 'mdcr-theme-wrapper' : '';
    const c = getActive();
    const activeConcepts = CONCEPTS.filter(c => c && !isDeletedConcept(c.id, c.logoFn, c.fileName));
    
    app.innerHTML = `
      <div class="${mdcrClass}" style="min-height:100vh;background:#fafafa;font-family:'Inter', 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu', sans-serif;">
        <style>
          @keyframes fadeSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
          @keyframes fadeIn{from{opacity:0;transform:scale(0.98)}to{opacity:1;transform:scale(1)}}
          *{box-sizing:border-box;}
          html{scroll-behavior:smooth;}
          input:focus{outline:none;}
          button:focus{outline:none;}
        </style>
        ${!c ? `
          ${renderHeader()}
          <div style="height:1px;background:linear-gradient(90deg,transparent,#e5e7eb,transparent);max-width:1400px;margin:0 auto;"></div>
          ${renderSearchAndFilters()}
          ${renderCardGrid()}
          <div style="max-width:1400px;margin:48px auto 0;padding:0 24px 48px;text-align:center;">
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
              <div style="width:32px;height:1px;background:#d1d5db;"></div>
              <span style="font-size:10px;color:#9ca3af;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">Logo Concept Gallery</span>
              <div style="width:32px;height:1px;background:#d1d5db;"></div>
            </div>
            <div style="font-size:11px;color:#9ca3af;line-height:1.6;">${activeConcepts.length} Concepts · 27 Brands · Interactive Mockups · Side-by-Side Compare</div>
          </div>
        ` : ''}
        ${renderInspector()}
        ${renderCompareBar()}
        ${renderCompareModal()}
        ${renderUploadModal()}
        ${renderDeleteModal()}
      </div>
    `;
  }

  return {
    render,
    setBrand(b) { selectedBrand = b; activeId = null; render(); },
    setSearch(q) { searchQuery = q; render(); },
    setActive(id) { scrollBeforeDetail = window.scrollY; activeId = id; render(); },
    closeDetail() { activeId = null; render(); window.scrollTo(0, scrollBeforeDetail); },
    toggleStyle(s) {
      const idx = selectedStyles.indexOf(s);
      if (idx > -1) selectedStyles.splice(idx, 1);
      else selectedStyles.push(s);
      render();
    },
    clearStyles() { selectedStyles = []; render(); },
    toggleCreator(c) { selectedCreator = selectedCreator === c ? '' : c; render(); },
    clearCreator() { selectedCreator = ''; render(); },
    toggleFavorite(e, id) { toggleFavorite(e, id); },
    toggleCompare(e, id) { toggleCompare(e, id); },
    setMockup(m) { mockupMode = m; render(); },
    openCompare() { isCompareOpen = true; render(); },
    closeCompare() { isCompareOpen = false; render(); },
    clearCompare() { compareIds = []; isCompareOpen = false; render(); },
    copyPrompt(btn, text) {
      navigator.clipboard.writeText(text);
      btn.textContent = '\u2713 COPIED';
      btn.style.background = '#16A34A';
      setTimeout(() => { btn.textContent = 'COPY PROMPT'; btn.style.background = '#27272A'; }, 2000);
    },
    openUploadModal() { isUploadModalOpen = true; isUploadSuccess = false; uploadStatusMsg = ''; render(); },
    closeUploadModal() { closeUploadModal(); },
    finishAndCloseUploadModal() { finishAndCloseUploadModal(); },
    openDeleteModal(id) { doOpenDeleteModal(id); },
    closeDeleteModal() { doCloseDeleteModal(); },
    confirmDeleteLogo() { doConfirmDeleteLogo(); },
    setUploadField(field, val) {
      uploadForm[field] = val;
      if (field === 'githubToken') {
        localStorage.setItem('ez_github_token', val);
      }
    },
    updateFileConceptName(fileId, name) { updateFileConceptName(fileId, name); },
    removeUploadFile(fileId) { removeUploadFile(fileId); },
    clearUploadFiles() { clearUploadFiles(); },
    handleFileSelect(input) { handleFileSelect(input); },
    submitUpload() { submitUpload(); }
  };
})();
