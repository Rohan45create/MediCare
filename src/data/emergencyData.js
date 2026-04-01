export const EMERGENCY_TOPICS = [
  {
    id: "cpr",
    title: "CPR",
    aliases: ["cardiac arrest", "not breathing", "heart stopped", "unconscious no pulse"],
    severity: "critical",
    severityMessage: "Call 108 immediately before starting CPR",
    icon: "🫀",
    summary: "CPR keeps blood flowing when the heart has stopped.",
    steps: [
      "Check if the person is responsive — tap shoulders and shout",
      "Call 108 or ask someone nearby to call immediately",
      "Lay the person flat on their back on a firm surface",
      "Place heel of your hand on centre of chest (lower half of breastbone)",
      "Place other hand on top, interlace fingers, keep arms straight",
      "Push down hard and fast — at least 5cm deep, 100–120 times per minute",
      "After 30 compressions, give 2 rescue breaths if trained",
      "Continue until ambulance arrives or person starts breathing"
    ],
    dos: [
      "Start CPR immediately — every second counts",
      "Push hard and fast — do not be afraid of hurting the person",
      "Let the chest fully rise between compressions",
      "Switch with another person every 2 minutes if possible"
    ],
    donts: [
      "Do not stop CPR until professional help arrives",
      "Do not give rescue breaths if you are not trained — compressions alone save lives",
      "Do not move the person if spinal injury is suspected",
      "Do not waste time looking for a pulse — start compressions"
    ],
    emergencyAction: "Call 108. Start CPR immediately. Send someone to find an AED.",
    video: {
      title: "How to perform CPR — Step by step",
      description: "British Red Cross official CPR tutorial for adults",
      youtubeId: "hizBdM1Ob68"
    }
  },
  {
    id: "choking",
    title: "Choking",
    aliases: ["cannot breathe", "food stuck", "blocked throat", "heimlich"],
    severity: "critical",
    severityMessage: "Act within seconds — brain damage starts in 4 minutes",
    icon: "🫁",
    summary: "An object is blocking the airway. Act immediately.",
    steps: [
      "Ask 'Are you choking?' — if they can speak or cough, encourage strong coughing",
      "If they cannot speak, cough, or breathe — call 108 immediately",
      "Stand behind the person, lean them slightly forward",
      "Give 5 firm back blows between shoulder blades with heel of your hand",
      "If not cleared: stand behind, wrap arms around their waist",
      "Make a fist, place thumb side against abdomen just above navel",
      "Grasp fist with other hand, give 5 sharp upward abdominal thrusts",
      "Alternate 5 back blows and 5 abdominal thrusts until object is cleared",
      "If person becomes unconscious, begin CPR"
    ],
    dos: [
      "Act immediately — do not wait",
      "Encourage coughing if they can still partially breathe",
      "Call 108 even if the object clears — internal injury possible"
    ],
    donts: [
      "Do not do blind finger sweeps in the mouth",
      "Do not perform abdominal thrusts on infants under 1 year",
      "Do not slap on the back if they are still coughing effectively"
    ],
    emergencyAction: "108 immediately. Start back blows + abdominal thrusts.",
    video: {
      title: "Choking first aid — Heimlich maneuver",
      description: "How to help a choking adult — St John Ambulance",
      youtubeId: "HGBBu4zr8sM"
    }
  },
  {
    id: "heart-attack",
    title: "Heart Attack",
    aliases: ["chest pain", "chest tightness", "heart pain", "myocardial"],
    severity: "critical",
    severityMessage: "Call 108 immediately. Do not drive yourself to hospital.",
    icon: "❤️",
    summary: "A blockage cuts blood supply to the heart muscle. Time is critical.",
    steps: [
      "Call 108 immediately — do not wait to see if it gets better",
      "Help the person sit down in a comfortable position (W-position: knees bent)",
      "Loosen any tight clothing around neck and chest",
      "If conscious and not allergic: give one adult aspirin (325mg) to chew slowly",
      "Keep the person calm and still — do not let them walk around",
      "Monitor breathing and pulse constantly",
      "If the person becomes unresponsive and stops breathing — begin CPR",
      "Unlock your door so paramedics can enter"
    ],
    dos: [
      "Call 108 as the very first action",
      "Stay with the person until ambulance arrives",
      "Note the time symptoms started — tell paramedics"
    ],
    donts: [
      "Do not give food or water",
      "Do not leave the person alone",
      "Do not let them drive themselves or walk to the car"
    ],
    emergencyAction: "108 immediately. Aspirin if available. CPR if unresponsive.",
    video: {
      title: "Heart attack — what to do",
      description: "St John Ambulance",
      youtubeId: "gDwt7dD3awc"
    }
  },
  {
    id: "stroke",
    title: "Stroke (FAST)",
    aliases: ["stroke", "face drooping", "arm weakness", "speech", "FAST", "brain attack"],
    severity: "critical",
    severityMessage: "Every minute = 2 million brain cells lost. Call 108 now.",
    icon: "🧠",
    summary: "A stroke cuts blood supply to the brain. Use the FAST test.",
    steps: [
      "F — FACE: Ask them to smile. Does one side droop?",
      "A — ARMS: Ask them to raise both arms. Does one drift down?",
      "S — SPEECH: Ask them to repeat a simple phrase. Is it slurred or strange?",
      "T — TIME: If ANY of these — call 108 immediately",
      "Note the exact time symptoms started and tell paramedics",
      "Keep person calm, still, and comfortable",
      "Do not give food, water, or any medication",
      "If unconscious and breathing — place in recovery position"
    ],
    dos: [
      "Note the exact time symptoms started",
      "Keep them still and reassured",
      "Unlock door for paramedics"
    ],
    donts: [
      "Do not give aspirin for stroke (unlike heart attack)",
      "Do not let them sleep it off",
      "Do not give food or water — swallowing reflex may be affected"
    ],
    emergencyAction: "108 immediately. Note symptom start time. Do not give aspirin.",
    video: {
      title: "Stroke — FAST test explained",
      description: "Recognising stroke symptoms with the FAST method",
      youtubeId: "ZDhzCIi0_wA"
    }
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    aliases: ["bleeding", "cut", "wound", "blood", "deep cut", "arterial"],
    severity: "critical",
    severityMessage: "Uncontrolled bleeding can be fatal in minutes",
    icon: "🩸",
    summary: "Apply pressure to stop blood loss immediately.",
    steps: [
      "Put on gloves if available — protect yourself from bloodborne illness",
      "Apply firm direct pressure on the wound using a clean cloth or bandage",
      "Press HARD and do not release — maintain constant pressure for 10–15 minutes",
      "If cloth soaks through, add more on top — do NOT remove the first cloth",
      "Elevate the injured limb above heart level if no broken bones",
      "Call 108 if: bleeding does not slow after 10 min, wound is deep, spurting blood",
      "If on a limb and life-threatening: apply tourniquet 5cm above wound as last resort",
      "Note time of tourniquet application and tell paramedics"
    ],
    dos: [
      "Apply continuous firm pressure",
      "Use the cleanest material available",
      "Keep the person lying down and warm"
    ],
    donts: [
      "Do not remove embedded objects from wounds",
      "Do not use a tourniquet unless bleeding is life-threatening",
      "Do not peek at the wound — every time you check, you break the clot"
    ],
    emergencyAction: "Apply pressure. Call 108 if bleeding does not stop in 10 min.",
    video: {
      title: "How to stop severe bleeding",
      description: "First aid for major bleeding — British Red Cross",
      youtubeId: "BQRqUxB5pn0"
    }
  },
  {
    id: "burns",
    title: "Burns",
    aliases: ["burn", "scald", "fire", "hot water", "chemical burn"],
    severity: "urgent",
    severityMessage: "Cool the burn immediately. Call 108 for large or deep burns.",
    icon: "🔥",
    summary: "Cool, cover, and seek help. Do not use ice or butter.",
    steps: [
      "Remove person from danger — turn off source if safe to do so",
      "Cool the burn with cool (not cold/iced) running water for 20 minutes",
      "Remove clothing and jewellery near the burn — unless stuck to skin",
      "Cover with a clean non-fluffy material (cling film is ideal, or clean plastic bag)",
      "Call 108 if: burn is larger than your palm, on face/hands/genitals, or deep/white",
      "Keep the person warm — burned skin loses heat rapidly",
      "Give paracetamol or ibuprofen for pain if conscious and able to swallow"
    ],
    dos: [
      "Cool with running water for the full 20 minutes",
      "Cover loosely with cling film or clean plastic",
      "Keep person warm while cooling the burn"
    ],
    donts: [
      "Do not use ice, iced water, or ice packs",
      "Do not apply butter, toothpaste, or any cream",
      "Do not burst blisters",
      "Do not remove clothing stuck to the burn"
    ],
    emergencyAction: "Cool 20 min with running water. 108 for large or deep burns.",
    video: {
      title: "Burns first aid treatment",
      description: "How to treat burns correctly — St John Ambulance",
      youtubeId: "TLr2qsEhpC8"
    }
  },
  {
    id: "snakebite",
    title: "Snake Bite",
    aliases: ["snake", "snakebite", "venom", "snake bite", "bitten by snake"],
    severity: "critical",
    severityMessage: "Treat ALL snake bites as venomous until confirmed otherwise",
    icon: "🐍",
    summary: "Keep still, call 108, do not try to suck out venom.",
    steps: [
      "Call 108 immediately — anti-venom is only available at hospitals",
      "Keep the person still and calm — movement spreads venom faster",
      "Immobilise the bitten limb — keep it at or below heart level",
      "Remove rings, watches, tight clothing near the bite — swelling will occur",
      "Note the time of the bite — tell the hospital",
      "Try to remember snake appearance (colour, size) — do NOT try to catch it",
      "Keep the person lying down and reassured until ambulance arrives"
    ],
    dos: [
      "Call 108 immediately",
      "Keep person still and calm",
      "Note time of bite and snake appearance"
    ],
    donts: [
      "Do not suck or cut the bite",
      "Do not apply tourniquet or ice",
      "Do not give alcohol or medication",
      "Do not try to catch the snake"
    ],
    emergencyAction: "108 immediately. Immobilise limb. Keep still. No tourniquet.",
    video: {
      title: "Snake bite first aid",
      description: "What to do immediately after a snake bite",
      youtubeId: "nH8o-bgwo_g"
    }
  },
  {
    id: "poisoning",
    title: "Poisoning",
    aliases: ["poison", "poisoning", "swallowed chemical", "overdose", "ate something toxic"],
    severity: "critical",
    severityMessage: "Call 108. Do NOT induce vomiting unless told to by medical staff.",
    icon: "☠️",
    summary: "Identify the substance. Call 108. Do not guess.",
    steps: [
      "Call 108 immediately — also call Poison Control: 1800-11-6117 (India, toll-free)",
      "Try to identify what was swallowed, how much, and when",
      "Keep the container/packaging nearby to show paramedics",
      "If conscious and not fitting — keep person still and calm",
      "If unconscious and breathing — place in recovery position",
      "If not breathing — begin CPR",
      "Do not give milk, water, or food unless told to by medical staff"
    ],
    dos: [
      "Identify the substance and dose",
      "Call 108 and Poison Control",
      "Keep person calm and still"
    ],
    donts: [
      "Do not induce vomiting — corrosives burn worse coming back up",
      "Do not give anything by mouth without medical instruction",
      "Do not leave the person alone"
    ],
    emergencyAction: "108 + 1800-11-6117. Keep container. Do NOT induce vomiting.",
    video: {
      title: "Poisoning first aid",
      description: "What to do when someone has been poisoned",
      youtubeId: "b2ieb8BZJuY"
    }
  },
  {
    id: "unconscious",
    title: "Unconscious Person",
    aliases: ["unconscious", "fainted", "not waking up", "collapsed", "unresponsive"],
    severity: "critical",
    severityMessage: "Check breathing immediately. Every second counts.",
    icon: "😵",
    summary: "Check responsiveness, breathing, and airway before doing anything else.",
    steps: [
      "Check responsiveness: tap shoulders firmly, shout their name",
      "Call 108 immediately or ask someone nearby to call",
      "Open the airway: tilt head back, lift chin gently",
      "Check for breathing: look, listen, feel for 10 seconds",
      "If BREATHING: place in recovery position (on side), monitor until help arrives",
      "If NOT BREATHING: begin CPR immediately (30 compressions + 2 breaths)",
      "If AED is available nearby, send someone to get it while CPR continues"
    ],
    dos: [
      "Check breathing before anything else",
      "Recovery position if breathing — CPR if not",
      "Stay with person and keep airway open"
    ],
    donts: [
      "Do not give water or food",
      "Do not shake or slap to wake them",
      "Do not leave them on their back if breathing (risk of choking on vomit)"
    ],
    emergencyAction: "108 immediately. Recovery position if breathing. CPR if not.",
    video: {
      title: "Unconscious casualty — what to do",
      description: "Recovery position and checking breathing — St John Ambulance",
      youtubeId: "I-p_YnvOs-0"
    }
  },
  {
    id: "first-aid",
    title: "First Aid Basics",
    aliases: ["first aid", "basic first aid", "emergency basics", "injured", "accident"],
    severity: "monitor",
    severityMessage: "Assess the situation calmly before acting",
    icon: "🩹",
    summary: "DR ABC — Danger, Response, Airway, Breathing, Circulation.",
    steps: [
      "D — DANGER: Check scene is safe for you before approaching",
      "R — RESPONSE: Check if person is conscious — tap and shout",
      "A — AIRWAY: Open airway — tilt head back, lift chin",
      "B — BREATHING: Look, listen, feel for 10 seconds",
      "C — CIRCULATION: Check for severe bleeding, control it with pressure",
      "Call 108 if any life-threatening signs found",
      "Place in recovery position if unconscious and breathing",
      "Begin CPR if not breathing"
    ],
    dos: [
      "Stay calm — panic makes things worse",
      "Assess before acting — make sure scene is safe",
      "Call for help early"
    ],
    donts: [
      "Do not move a casualty unless in immediate danger",
      "Do not give anything by mouth to an unconscious person",
      "Do not leave the person unattended"
    ],
    emergencyAction: "DR ABC. Call 108 if unresponsive or not breathing.",
    video: {
      title: "First aid basics — DR ABC",
      description: "Primary survey and basic life support overview",
      youtubeId: "TYIfqjU1BC8"
    }
  }
];

export const SYMPTOM_MAP = {
  "chest pain": "heart-attack",
  "chest tightness": "heart-attack",
  "not breathing": "cpr",
  "no pulse": "cpr",
  "food stuck": "choking",
  "cant breathe": "choking",
  "face drooping": "stroke",
  "arm weakness": "stroke",
  "slurred speech": "stroke",
  "wont wake up": "unconscious",
  "passed out": "unconscious",
  "deep cut": "bleeding",
  "lots of blood": "bleeding",
  "hot water burn": "burns",
  "fire burn": "burns",
  "swallowed poison": "poisoning",
  "took too many pills": "poisoning",
  "snake": "snakebite"
};

export const QUICK_CHIPS = [
  { label: "CPR", id: "cpr", icon: "🫀" },
  { label: "Choking", id: "choking", icon: "🫁" },
  { label: "Heart Attack", id: "heart-attack", icon: "❤️" },
  { label: "Stroke", id: "stroke", icon: "🧠" },
  { label: "Bleeding", id: "bleeding", icon: "🩸" },
  { label: "Burns", id: "burns", icon: "🔥" },
  { label: "Snake Bite", id: "snakebite", icon: "🐍" },
  { label: "Poisoning", id: "poisoning", icon: "☠️" },
  { label: "Unconscious", id: "unconscious", icon: "😵" },
  { label: "First Aid", id: "first-aid", icon: "🩹" }
];
