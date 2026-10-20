export const student = {
  name: "Ayesha Rahman",
  initials: "👧🏻",
  className: "Class 3",
  section: "Section A",
  roll: "12",
  school: "Sunrise Primary School",
  location: "Dhaka, Bangladesh",
};

/* Class-level activity data lives in lib/components/ — re-exported
   here so pages can import from either the barrel or "lib/data". */
export {
  classLevels,
  getClassLevel,
  allActivities,
  allSubjects,
  activitiesBySubject,
} from "./components";

/* ============================================================
   Data classes
   Small, dependency-free helpers that own the sample data and
   the queries the pages need. Kept plain so they run on both the
   server and the client, and so swapping in a real API later is
   a matter of changing one method body.
   ============================================================ */

export class Student {
  constructor(data = student) {
    this.name = data.name;
    this.initials = data.initials;
    this.className = data.className;
    this.section = data.section;
    this.roll = data.roll;
    this.school = data.school;
    this.location = data.location;
  }

  get firstName() {
    return this.name.split(" ")[0];
  }

  get label() {
    return `${this.className} • ${this.section}`;
  }

  get display() {
    return `${this.name} • Roll ${this.roll}`;
  }
}

export class Subjects {
  constructor(list = subjects) {
    this.list = list;
  }

  get count() {
    return this.list.length;
  }

  all() {
    return this.list;
  }

  get(english) {
    return this.list.find((s) => s.english === english) ?? null;
  }

  first() {
    return this.list[0] ?? null;
  }

  top(n) {
    return this.list.slice(0, n);
  }

  lessonsFor(english) {
    return lessons[english] ?? [];
  }

  averagePercent() {
    if (!this.list.length) return 0;
    const total = this.list.reduce((sum, s) => sum + s.percent, 0);
    return Math.round(total / this.list.length);
  }
}

export class Tasks {
  constructor(list = tasks) {
    this.list = list;
  }

  get count() {
    return this.list.length;
  }

  doneIds() {
    return this.list.filter((t) => t.done).map((t) => t.id);
  }

  get(id) {
    return this.list.find((t) => t.id === id) ?? null;
  }

  filter({ status = "All tasks", query = "", completed = [] } = {}) {
    const q = query.trim().toLowerCase();
    return this.list.filter((task) => {
      const isDone = completed.includes(task.id);
      const matchesFilter =
        status === "All tasks" || (status === "Completed" ? isDone : !isDone);
      const matchesQuery =
        !q || `${task.subject} ${task.title}`.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }

  progress(completed = []) {
    return { done: completed.length, total: this.list.length };
  }
}

export class Attendance {
  constructor(days = attendanceDays) {
    this.days = days;
  }

  count(status) {
    return this.days.filter((d) => d.status === status).length;
  }

  get present() {
    return this.count("present");
  }

  get absent() {
    return this.count("absent");
  }

  get late() {
    return this.count("late");
  }

  get schoolDays() {
    return this.present + this.absent + this.late;
  }

  percent() {
    if (!this.schoolDays) return 0;
    return Math.round(((this.present + this.late) / this.schoolDays) * 100);
  }

  summary() {
    return {
      present: this.present,
      absent: this.absent,
      late: this.late,
      percent: this.percent(),
    };
  }
}

export class Messages {
  constructor(list = messages, thread = teacherMessages) {
    this.list = list;
    this.thread = thread;
  }

  get count() {
    return this.list.length;
  }

  unread() {
    return this.list.filter((m) => m.unread);
  }

  unreadCount() {
    return this.unread().length;
  }

  find(id) {
    return this.list.find((m) => m.id === id) ?? this.first();
  }

  first() {
    return this.list[0] ?? null;
  }
}

export const navItems = [
  { key: "nav.overview", label: "Overview", href: "/", icon: "Home" },
  { key: "nav.learning", label: "My learning", href: "/learning", icon: "BookOpen" },
  { key: "nav.classes", label: "Classes", href: "/classes", icon: "Layers" },
  { key: "nav.routine", label: "Class routine", href: "/routine", icon: "CalendarDays" },
  { key: "nav.attendance", label: "Attendance", href: "/attendance", icon: "ClipboardCheck" },
  { key: "nav.achievements", label: "Achievements", href: "/achievements", icon: "Award" },
  { key: "nav.messages", label: "Messages", href: "/messages", icon: "MessageCircle", count: 2 },
  { key: "nav.community", label: "Class community", href: "/community", icon: "Users" },
  { key: "nav.settings", label: "Settings", href: "/settings", icon: "Settings" },
];

export const tasks = [
  {
    id: 1,
    subject: "Bangla",
    title: "Read the story: Khokababu",
    detail: "পৃষ্ঠা ২৪–২৭ • ১৫ মিনিট",
    type: "Reading",
    color: "rose",
    done: true,
  },
  {
    id: 2,
    subject: "Mathematics",
    title: "Addition practice",
    detail: "১০টি ছোট অঙ্ক • ২০ মিনিট",
    type: "Practice",
    color: "blue",
    done: false,
  },
  {
    id: 3,
    subject: "English",
    title: "Learn 5 new words",
    detail: "Listen, repeat, and write",
    type: "Vocabulary",
    color: "purple",
    done: false,
  },
  {
    id: 4,
    subject: "Science",
    title: "Plants around us",
    detail: "Observe one plant at home",
    type: "Activity",
    color: "green",
    done: false,
  },
];

export const subjects = [
  {
    name: "বাংলা",
    english: "Bangla",
    percent: 82,
    icon: "ক",
    color: "rose",
    lessons: "18 / 22 lessons",
    teacher: "Morjina Begum",
    book: "Bangla Reader Class 3",
  },
  {
    name: "গণিত",
    english: "Mathematics",
    percent: 68,
    icon: "＋",
    color: "blue",
    lessons: "15 / 22 lessons",
    teacher: "Md. Karim Hossain",
    book: "Mathematics Book 3",
  },
  {
    name: "English",
    english: "English",
    percent: 74,
    icon: "Aa",
    color: "purple",
    lessons: "16 / 22 lessons",
    teacher: "Sarah Ahmed",
    book: "English for Today 3",
  },
  {
    name: "প্রাথমিক বিজ্ঞান",
    english: "Science",
    percent: 56,
    icon: "✿",
    color: "green",
    lessons: "10 / 18 lessons",
    teacher: "Rafiqul Islam",
    book: "Our Bangla World 3",
  },
  {
    name: "বাংলাদেশ ও বিশ্বপরিচয়",
    english: "BGS",
    percent: 61,
    icon: "🗺",
    color: "orange",
    lessons: "11 / 18 lessons",
    teacher: "Nusrat Jahan",
    book: "Bangladesh & Global Studies 3",
  },
  {
    name: "ইসলাম ও নৈতিক শিক্ষা",
    english: "Islam",
    percent: 90,
    icon: "☪",
    color: "teal",
    lessons: "18 / 20 lessons",
    teacher: "Abdul Mannan",
    book: "Islam & Moral Education 3",
  },
];

export const lessons = {
  Bangla: [
    { title: "পড়া ১: খোকাবাবু", done: true, minutes: 15 },
    { title: "পড়া ২: আমার পরিবার", done: true, minutes: 12 },
    { title: "পড়া ৩: বাংলাদেশের নদী", done: false, minutes: 18 },
    { title: "পড়া ৪: ছোট কবিতা", done: false, minutes: 10 },
  ],
  Mathematics: [
    { title: "Lesson 1: Numbers to 1000", done: true, minutes: 20 },
    { title: "Lesson 2: Addition", done: true, minutes: 20 },
    { title: "Lesson 3: Subtraction", done: false, minutes: 20 },
    { title: "Lesson 4: Multiplication tables", done: false, minutes: 25 },
  ],
  English: [
    { title: "Unit 1: My School", done: true, minutes: 20 },
    { title: "Unit 2: Friends", done: true, minutes: 18 },
    { title: "Unit 3: Animals", done: false, minutes: 18 },
    { title: "Unit 4: Weather", done: false, minutes: 15 },
  ],
  Science: [
    { title: "Chapter 1: Our Body", done: true, minutes: 15 },
    { title: "Chapter 2: Plants Around Us", done: false, minutes: 15 },
    { title: "Chapter 3: Food and Health", done: false, minutes: 15 },
  ],
  BGS: [
    { title: "পাঠ ১: আমাদেশ", done: true, minutes: 12 },
    { title: "পাঠ ২: আমাদেশের প্রশাসন", done: false, minutes: 12 },
  ],
  Islam: [
    { title: "পাঠ ১: আকাইদ", done: true, minutes: 12 },
    { title: "পাঠ ২: নামাজ", done: true, minutes: 12 },
  ],
};

export const routine = [
  {
    time: "8:00 – 8:40",
    periods: [
      "Bangla",
      "Mathematics",
      "English",
      "Science",
      "Bangla",
      "Assembly",
    ],
  },
  {
    time: "8:40 – 9:20",
    periods: ["Mathematics", "English", "Science", "BGS", "Islam", "Library"],
  },
  {
    time: "9:20 – 10:00",
    periods: ["English", "Science", "Bangla", "Mathematics", "BGS", "Games"],
  },
  {
    time: "10:00 – 10:20",
    periods: ["Break", "Break", "Break", "Break", "Break", "Break"],
  },
  {
    time: "10:20 – 11:00",
    periods: ["Science", "Bangla", "Mathematics", "English", "Islam", "Art"],
  },
  {
    time: "11:00 – 11:40",
    periods: ["BGS", "Islam", "Bangla", "Mathematics", "Science", "Reading"],
  },
  {
    time: "11:40 – 12:20",
    periods: ["Islam", "BGS", "English", "Bangla", "Mathematics", "Homeroom"],
  },
];

export const routineDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
export const routineSubjects = {
  Bangla: "rose",
  Mathematics: "blue",
  English: "purple",
  Science: "green",
  BGS: "orange",
  Islam: "teal",
  Assembly: "gray",
  Library: "gray",
  Games: "gray",
  Break: "break",
  Art: "gray",
  Reading: "gray",
  Homeroom: "gray",
  Friday: "gray",
  Holiday: "gray",
};

export const attendanceDays = [
  { day: 1, status: "present" },
  { day: 2, status: "present" },
  { day: 3, status: "present" },
  { day: 4, status: "present" },
  { day: 5, status: "late" },
  { day: 6, status: "present" },
  { day: 7, status: "holiday" },
  { day: 8, status: "holiday" },
  { day: 9, status: "present" },
  { day: 10, status: "present" },
  { day: 11, status: "absent" },
  { day: 12, status: "present" },
  { day: 13, status: "present" },
  { day: 14, status: "present" },
  { day: 15, status: "holiday" },
  { day: 16, status: "holiday" },
  { day: 17, status: "present" },
  { day: 18, status: "present" },
  { day: 19, status: "late" },
  { day: 20, status: "present" },
  { day: 21, status: "present" },
  { day: 22, status: "present" },
  { day: 23, status: "holiday" },
  { day: 24, status: "holiday" },
  { day: 25, status: "present" },
  { day: 26, status: "present" },
  { day: 27, status: "present" },
  { day: 28, status: "present" },
  { day: 29, status: "present" },
  { day: 30, status: "present" },
];

export const achievements = [
  {
    id: 1,
    title: "First Story Reader",
    detail: "Finished your first Bangla story",
    icon: "📖",
    earned: true,
    date: "12 Sep 2026",
  },
  {
    id: 2,
    title: "Math Star",
    detail: "10 correct addition answers in a row",
    icon: "⭐",
    earned: true,
    date: "20 Sep 2026",
  },
  {
    id: 3,
    title: "Perfect Week",
    detail: "Full attendance all week",
    icon: "🏆",
    earned: true,
    date: "28 Sep 2026",
  },
  {
    id: 4,
    title: "Word Wizard",
    detail: "Learned 50 English words",
    icon: "✨",
    earned: true,
    date: "5 Oct 2026",
  },
  {
    id: 5,
    title: "Curious Mind",
    detail: "Asked 10 great questions in class",
    icon: "💡",
    earned: false,
    progress: "8 / 10",
  },
  {
    id: 6,
    title: "Kind Friend",
    detail: "Helped 5 classmates this month",
    icon: "🤝",
    earned: false,
    progress: "3 / 5",
  },
  {
    id: 7,
    title: "Science Explorer",
    detail: "Complete all science activities",
    icon: "🔬",
    earned: false,
    progress: "4 / 8",
  },
  {
    id: 8,
    title: "Homework Hero",
    detail: "30 homeworks submitted on time",
    icon: "🎯",
    earned: false,
    progress: "24 / 30",
  },
];

export const messages = [
  {
    id: 1,
    from: "Morjina Begum",
    role: "Bangla Teacher",
    avatar: "👩🏽‍🏫",
    text: "Ayesha, beautiful work on the Khokababu story summary! Read page 30 for tomorrow.",
    time: "9:15 AM",
    unread: true,
  },
  {
    id: 2,
    from: "Md. Karim Hossain",
    role: "Math Teacher",
    avatar: "👨🏽‍🏫",
    text: "Please practice the subtraction worksheet I gave today.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    from: "Class Group",
    role: "Class 3-A",
    avatar: "🏫",
    text: "Reading festival is on Sunday! Bring your favourite book.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    from: "Sarah Ahmed",
    role: "English Teacher",
    avatar: "👩🏻‍🏫",
    text: "Well done on your English unit test, Ayesha.",
    time: "Mon",
    unread: false,
  },
  {
    id: 5,
    from: "School Office",
    role: "Administration",
    avatar: "🏛",
    text: "Parent meeting notice: Thursday 22 October, 10:30 AM.",
    time: "Sun",
    unread: false,
  },
];

export const classmates = [
  { name: "Tanvir Ahmed", avatar: "👦🏻", note: "Math buddy" },
  { name: "Nabila Islam", avatar: "👧🏽", note: "Reading partner" },
  { name: "Sadia Rahman", avatar: "👧🏼", note: "Desk neighbour" },
  { name: "Arif Hossain", avatar: "👦🏽", note: "Games team" },
  { name: "Mim Akter", avatar: "👧🏽", note: "Art club" },
  { name: "Zayed Hasan", avatar: "👦🏼", note: "Library crew" },
];

export const notices = [
  {
    day: "২২",
    month: "OCT",
    title: "Class 3 parent meeting",
    meta: "Thursday • 10:30 AM",
    tone: "blue",
  },
  {
    day: "২৫",
    month: "OCT",
    title: "Reading festival",
    meta: "Sunday • School library",
    tone: "orange",
  },
  {
    day: "২৮",
    month: "OCT",
    title: "Art & creativity day",
    meta: "Wednesday • Bring your colors",
    tone: "purple",
  },
  {
    day: "০১",
    month: "NOV",
    title: "Monthly test begins",
    meta: "Sunday • All subjects",
    tone: "green",
  },
];

export const teacherMessages = [
  {
    id: 1,
    sender: "teacher",
    text: "Hello Ayesha! How did you find the science activity today?",
  },
  {
    id: 2,
    sender: "student",
    text: "It was fun! I observed a tulsi plant at home 🌱",
  },
  {
    id: 3,
    sender: "teacher",
    text: "Wonderful! Write three lines about it in your notebook for tomorrow.",
  },
  {
    id: 4,
    sender: "student",
    text: "Okay ma'am, I will do it after dinner 😊",
  },
];
