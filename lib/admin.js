/* ============================================================
   Admin data + data classes
   The admin console works against its own sample dataset so the
   student experience stays untouched. Every mutation the UI needs
   lives behind one of these classes, which makes swapping in a
   real API a matter of changing method bodies only.
   ============================================================ */

export const adminProfile = {
  name: "Rahim Uddin",
  initials: "🧑🏽‍💼",
  role: "School administrator",
  school: "Sunrise Primary School",
  location: "Dhaka, Bangladesh",
  email: "admin@sunriseprimary.edu.bd",
};

/* ---------- Students directory ---------- */

export const studentDirectory = [
  {
    id: "S-1001",
    name: "Ayesha Rahman",
    className: "Class 3",
    section: "A",
    roll: "12",
    gender: "F",
    guardian: "Rahman Ali",
    phone: "+880 1700-000012",
    attendance: 96,
    points: 840,
    status: "active",
  },
  {
    id: "S-1002",
    name: "Tanvir Ahmed",
    className: "Class 3",
    section: "A",
    roll: "03",
    gender: "M",
    guardian: "Ahmed Khan",
    phone: "+880 1700-000003",
    attendance: 91,
    points: 720,
    status: "active",
  },
  {
    id: "S-1003",
    name: "Nabila Islam",
    className: "Class 3",
    section: "A",
    roll: "07",
    gender: "F",
    guardian: "Kamal Islam",
    phone: "+880 1700-000007",
    attendance: 98,
    points: 910,
    status: "active",
  },
  {
    id: "S-1004",
    name: "Arif Hossain",
    className: "Class 3",
    section: "B",
    roll: "18",
    gender: "M",
    guardian: "Jamal Hossain",
    phone: "+880 1700-000018",
    attendance: 84,
    points: 540,
    status: "active",
  },
  {
    id: "S-1005",
    name: "Sadia Rahman",
    className: "Class 2",
    section: "A",
    roll: "05",
    gender: "F",
    guardian: "Sohel Rana",
    phone: "+880 1700-000005",
    attendance: 93,
    points: 660,
    status: "active",
  },
  {
    id: "S-1006",
    name: "Mim Akter",
    className: "Class 2",
    section: "B",
    roll: "21",
    gender: "F",
    guardian: "Akter Uddin",
    phone: "+880 1700-000021",
    attendance: 88,
    points: 480,
    status: "active",
  },
  {
    id: "S-1007",
    name: "Zayed Hasan",
    className: "Class 1",
    section: "A",
    roll: "09",
    gender: "M",
    guardian: "Hasan Mahmud",
    phone: "+880 1700-000009",
    attendance: 95,
    points: 390,
    status: "active",
  },
  {
    id: "S-1008",
    name: "Riya Das",
    className: "Class 1",
    section: "A",
    roll: "14",
    gender: "F",
    guardian: "Subir Das",
    phone: "+880 1700-000014",
    attendance: 90,
    points: 410,
    status: "active",
  },
  {
    id: "S-1009",
    name: "Sabbir Khan",
    className: "Nursery",
    section: "A",
    roll: "02",
    gender: "M",
    guardian: "Nazrul Khan",
    phone: "+880 1700-000002",
    attendance: 82,
    points: 150,
    status: "active",
  },
  {
    id: "S-1010",
    name: "Joya Sultana",
    className: "Nursery",
    section: "A",
    roll: "11",
    gender: "F",
    guardian: "Mizan Sultana",
    phone: "+880 1700-000011",
    attendance: 79,
    points: 120,
    status: "inactive",
  },
  {
    id: "S-1011",
    name: "Rifat Karim",
    className: "Play Group",
    section: "A",
    roll: "04",
    gender: "M",
    guardian: "Karim Mia",
    phone: "+880 1700-000004",
    attendance: 87,
    points: 90,
    status: "active",
  },
  {
    id: "S-1012",
    name: "Meherun Nesa",
    className: "Play Group",
    section: "A",
    roll: "06",
    gender: "F",
    guardian: "Nesa Begum",
    phone: "+880 1700-000006",
    attendance: 92,
    points: 110,
    status: "active",
  },
];

/* ---------- Teachers directory ---------- */

export const teacherDirectory = [
  {
    id: "T-201",
    name: "Morjina Begum",
    subject: "Bangla",
    classes: ["Class 3", "Class 2"],
    email: "morjina@sunriseprimary.edu.bd",
    phone: "+880 1800-000201",
    students: 58,
    rating: 4.8,
    status: "active",
  },
  {
    id: "T-202",
    name: "Md. Karim Hossain",
    subject: "Mathematics",
    classes: ["Class 3", "Class 1"],
    email: "karim@sunriseprimary.edu.bd",
    phone: "+880 1800-000202",
    students: 62,
    rating: 4.6,
    status: "active",
  },
  {
    id: "T-203",
    name: "Sarah Ahmed",
    subject: "English",
    classes: ["Class 3", "Class 2", "Class 1"],
    email: "sarah@sunriseprimary.edu.bd",
    phone: "+880 1800-000203",
    students: 84,
    rating: 4.9,
    status: "active",
  },
  {
    id: "T-204",
    name: "Rafiqul Islam",
    subject: "Science",
    classes: ["Class 3"],
    email: "rafiq@sunriseprimary.edu.bd",
    phone: "+880 1800-000204",
    students: 28,
    rating: 4.5,
    status: "active",
  },
  {
    id: "T-205",
    name: "Nusrat Jahan",
    subject: "BGS",
    classes: ["Class 3", "Class 2"],
    email: "nusrat@sunriseprimary.edu.bd",
    phone: "+880 1800-000205",
    students: 56,
    rating: 4.7,
    status: "active",
  },
  {
    id: "T-206",
    name: "Abdul Mannan",
    subject: "Islam",
    classes: ["Class 3", "Class 2", "Class 1"],
    email: "mannan@sunriseprimary.edu.bd",
    phone: "+880 1800-000206",
    students: 88,
    rating: 4.4,
    status: "active",
  },
  {
    id: "T-207",
    name: "Farhana Yasmin",
    subject: "Play & Nursery",
    classes: ["Nursery", "Play Group"],
    email: "farhana@sunriseprimary.edu.bd",
    phone: "+880 1800-000207",
    students: 46,
    rating: 4.9,
    status: "on leave",
  },
];

/* ---------- Notices / announcements ---------- */

export const adminNotices = [
  {
    id: "N-301",
    title: "Class 3 parent meeting",
    audience: "Class 3",
    date: "22 Oct 2026",
    time: "10:30 AM",
    tone: "blue",
    status: "published",
    body: "Parents of Class 3 students are invited to discuss the second-term progress.",
  },
  {
    id: "N-302",
    title: "Reading festival",
    audience: "Whole school",
    date: "25 Oct 2026",
    time: "9:00 AM",
    tone: "orange",
    status: "published",
    body: "Bring your favourite book to the school library festival.",
  },
  {
    id: "N-303",
    title: "Art & creativity day",
    audience: "Whole school",
    date: "28 Oct 2026",
    time: "9:30 AM",
    tone: "purple",
    status: "published",
    body: "A day of drawing, colouring, and crafts. Bring your colours.",
  },
  {
    id: "N-304",
    title: "Monthly test begins",
    audience: "Whole school",
    date: "01 Nov 2026",
    time: "8:00 AM",
    tone: "green",
    status: "draft",
    body: "Monthly tests across all subjects begin the first Sunday of November.",
  },
  {
    id: "N-305",
    title: "Parent-teacher evening",
    audience: "Class 1 & 2",
    date: "08 Nov 2026",
    time: "4:00 PM",
    tone: "rose",
    status: "draft",
    body: "An evening for Class 1 and 2 parents to meet subject teachers.",
  },
];

/* ---------- Recent admin activity ---------- */

export const adminActivity = [
  {
    id: 1,
    who: "Morjina Begum",
    action: "marked attendance for Class 3-A",
    time: "12 min ago",
    tone: "green",
  },
  {
    id: 2,
    who: "Rahim Uddin",
    action: "published the reading festival notice",
    time: "1 hour ago",
    tone: "blue",
  },
  {
    id: 3,
    who: "Sarah Ahmed",
    action: "added 2 new English activities",
    time: "3 hours ago",
    tone: "purple",
  },
  {
    id: 4,
    who: "Md. Karim Hossain",
    action: "sent a message to Class 3 parents",
    time: "Yesterday",
    tone: "orange",
  },
  {
    id: 5,
    who: "School office",
    action: "enrolled 3 new students",
    time: "Yesterday",
    tone: "violet",
  },
];

/* ============================================================
   Data classes
   ============================================================ */

export class Admin {
  constructor(data = adminProfile) {
    this.profile = data;
  }

  get name() {
    return this.profile.name;
  }

  get firstName() {
    return this.profile.name.split(" ")[0];
  }

  get initials() {
    return this.profile.initials;
  }

  get role() {
    return this.profile.role;
  }

  get school() {
    return this.profile.school;
  }

  get location() {
    return this.profile.location;
  }

  get email() {
    return this.profile.email;
  }
}

export class Students {
  constructor(list = studentDirectory) {
    this.list = list;
  }

  get count() {
    return this.list.length;
  }

  all() {
    return this.list;
  }

  get(id) {
    return this.list.find((s) => s.id === id) ?? null;
  }

  search(query = "") {
    const q = query.trim().toLowerCase();
    if (!q) return this.list;
    return this.list.filter((s) =>
      `${s.name} ${s.id} ${s.className} ${s.section} ${s.guardian}`
        .toLowerCase()
        .includes(q),
    );
  }

  filter({ className = "All classes", status = "All", query = "" } = {}) {
    return this.search(query).filter((s) => {
      const matchesClass =
        className === "All classes" || s.className === className;
      const matchesStatus = status === "All" || s.status === status;
      return matchesClass && matchesStatus;
    });
  }

  byClass() {
    return this.list.reduce((acc, s) => {
      acc[s.className] = (acc[s.className] || 0) + 1;
      return acc;
    }, {});
  }

  activeCount() {
    return this.list.filter((s) => s.status === "active").length;
  }

  averageAttendance() {
    if (!this.list.length) return 0;
    return Math.round(
      this.list.reduce((sum, s) => sum + s.attendance, 0) / this.list.length,
    );
  }

  create(record) {
    const nextId = `S-${1000 + this.list.length + 1}`;
    const student = {
      id: nextId,
      attendance: 0,
      points: 0,
      status: "active",
      ...record,
    };
    this.list = [student, ...this.list];
    return student;
  }

  update(id, patch) {
    this.list = this.list.map((s) => (s.id === id ? { ...s, ...patch } : s));
    return this.get(id);
  }

  remove(id) {
    this.list = this.list.filter((s) => s.id !== id);
  }
}

export class Teachers {
  constructor(list = teacherDirectory) {
    this.list = list;
  }

  get count() {
    return this.list.length;
  }

  all() {
    return this.list;
  }

  get(id) {
    return this.list.find((t) => t.id === id) ?? null;
  }

  search(query = "") {
    const q = query.trim().toLowerCase();
    if (!q) return this.list;
    return this.list.filter((t) =>
      `${t.name} ${t.id} ${t.subject} ${t.classes.join(" ")}`
        .toLowerCase()
        .includes(q),
    );
  }

  filter({ subject = "All subjects", status = "All", query = "" } = {}) {
    return this.search(query).filter((t) => {
      const matchesSubject =
        subject === "All subjects" || t.subject === subject;
      const matchesStatus = status === "All" || t.status === status;
      return matchesSubject && matchesStatus;
    });
  }

  subjects() {
    return [...new Set(this.list.map((t) => t.subject))];
  }

  totalStudents() {
    return this.list.reduce((sum, t) => sum + t.students, 0);
  }

  averageRating() {
    if (!this.list.length) return 0;
    return (
      Math.round(
        (this.list.reduce((sum, t) => sum + t.rating, 0) / this.list.length) *
          10,
      ) / 10
    );
  }

  create(record) {
    const nextId = `T-${200 + this.list.length + 1}`;
    const teacher = {
      id: nextId,
      students: 0,
      rating: 5,
      status: "active",
      classes: [],
      ...record,
    };
    this.list = [teacher, ...this.list];
    return teacher;
  }

  update(id, patch) {
    this.list = this.list.map((t) => (t.id === id ? { ...t, ...patch } : t));
    return this.get(id);
  }

  remove(id) {
    this.list = this.list.filter((t) => t.id !== id);
  }
}

export class AdminNotices {
  constructor(list = adminNotices) {
    this.list = list;
  }

  get count() {
    return this.list.length;
  }

  all() {
    return this.list;
  }

  get(id) {
    return this.list.find((n) => n.id === id) ?? null;
  }

  filter({ status = "All", query = "" } = {}) {
    const q = query.trim().toLowerCase();
    return this.list.filter((n) => {
      const matchesStatus = status === "All" || n.status === status;
      const matchesQuery =
        !q || `${n.title} ${n.audience} ${n.body}`.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }

  get publishedCount() {
    return this.list.filter((n) => n.status === "published").length;
  }

  get draftCount() {
    return this.list.filter((n) => n.status === "draft").length;
  }

  create(record) {
    const nextId = `N-${300 + this.list.length + 1}`;
    const notice = {
      id: nextId,
      date: "Today",
      time: "9:00 AM",
      tone: "blue",
      status: "draft",
      ...record,
    };
    this.list = [notice, ...this.list];
    return notice;
  }

  update(id, patch) {
    this.list = this.list.map((n) => (n.id === id ? { ...n, ...patch } : n));
    return this.get(id);
  }

  remove(id) {
    this.list = this.list.filter((n) => n.id !== id);
  }
}

export class AdminStats {
  constructor(
    students = new Students(),
    teachers = new Teachers(),
    notices = new AdminNotices(),
  ) {
    this.students = students;
    this.teachers = teachers;
    this.notices = notices;
  }

  snapshot() {
    return {
      students: this.students.count,
      activeStudents: this.students.activeCount(),
      teachers: this.teachers.count,
      attendance: this.students.averageAttendance(),
      notices: this.notices.count,
      published: this.notices.publishedCount,
      drafts: this.notices.draftCount,
      avgRating: this.teachers.averageRating(),
    };
  }

  byClass() {
    return this.students.byClass();
  }
}

export const adminNavItems = [
  {
    key: "admin.nav.overview",
    label: "Overview",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    key: "admin.nav.students",
    label: "Students",
    href: "/admin/students",
    icon: "Users",
  },
  {
    key: "admin.nav.teachers",
    label: "Teachers",
    href: "/admin/teachers",
    icon: "GraduationCap",
  },
  {
    key: "admin.nav.classes",
    label: "Classes",
    href: "/admin/classes",
    icon: "Layers",
  },
  {
    key: "admin.nav.notices",
    label: "Notices",
    href: "/admin/notices",
    icon: "Megaphone",
  },
  {
    key: "admin.nav.settings",
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
];
