import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const App = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Find which section is currently in view
      const sections = ["hero", "importance", "threats", "actions", "about"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const navItems = [
    { id: "hero", label: "Beranda", icon: "🏠" },
    { id: "importance", label: "Pentingnya Alam", icon: "🌿" },
    { id: "threats", label: "Ancaman", icon: "⚠️" },
    { id: "actions", label: "Aksi Kita", icon: "✊" },
    { id: "about", label: "Tentang", icon: "ℹ️" }
  ];

  return (
    <div className="relative font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-emerald-900/95 shadow-lg backdrop-blur-md py-2" : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.h1 className="text-3xl font-bold text-white">
                Lestari<span className="text-emerald-300">Alam</span>
              </motion.h1>
              <motion.div
                className="absolute -bottom-1 left-0 h-1 bg-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className="text-white p-2"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </motion.button>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                className={`cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-emerald-300 font-medium border-b-2 border-emerald-400' 
                    : 'text-white hover:text-emerald-200'
                } transition-colors`}
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden absolute w-full bg-emerald-900/95 backdrop-blur-md shadow-xl ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                className={`cursor-pointer flex items-center ${
                  activeSection === item.id 
                    ? 'text-emerald-300 font-medium' 
                    : 'text-white'
                }`}
                whileHover={{ x: 5 }}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen relative flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-900/90 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
          alt="Hutan Hujan Tropis" 
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
        />
        
        <motion.div 
          className="relative z-10 px-6 max-w-4xl mx-auto text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-emerald-600/80 text-white text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            SELAMAT DATANG DI LESTARIALAM
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            Selamatkan <motion.span 
              className="text-emerald-300 relative inline-block"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, 0, -2, 0] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >Bumi</motion.span> Kita
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Alam bukan warisan nenek moyang, tapi titipan anak cucu kita. Mari bersama menjaga kelestariannya untuk masa depan yang lebih baik.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-emerald-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("actions")}
            >
              Mulai Aksi
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("importance")}
            >
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <motion.div 
            className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center"
            whileHover={{ scale: 1.2 }}
          >
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ 
                y: [0, 15, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Importance Section */}
      <section 
        id="importance" 
        className="min-h-screen py-20 bg-gradient-to-b from-emerald-50 to-emerald-100"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-emerald-200 text-emerald-800 text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              MENGENAL LEBIH DEKAT
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 text-emerald-900"
              whileHover={{ scale: 1.02 }}
            >
              Mengapa Alam Penting?
            </motion.h2>
            <p className="text-lg text-emerald-700">
              Alam adalah rumah kita bersama, dan perannya sangat vital dalam menjamin kehidupan di bumi tetap seimbang dan berkelanjutan.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: "Sumber Kehidupan",
                icon: "🌱",
                description: "Alam menyediakan udara bersih, air, makanan, dan obat-obatan yang menjadi dasar kehidupan manusia dan semua makhluk hidup.",
                color: "bg-gradient-to-br from-emerald-500 to-green-400"
              },
              {
                title: "Penyeimbang Iklim",
                icon: "🌍",
                description: "Hutan dan lautan berperan sebagai penyerap karbon alami yang mengatur suhu bumi dan menjaga kestabilan iklim global.",
                color: "bg-gradient-to-br from-blue-500 to-cyan-400"
              },
              {
                title: "Keanekaragaman Hayati",
                icon: "🦋",
                description: "Alam menampung jutaan spesies yang saling terhubung dalam jaringan kehidupan yang kompleks dan rapuh.",
                color: "bg-gradient-to-br from-amber-500 to-yellow-400"
              },
              {
                title: "Sumber Ekonomi",
                icon: "💰",
                description: "Lebih dari 50% PDB global bergantung pada alam. Sektor pertanian, pariwisata, dan lainnya membutuhkan ekosistem sehat.",
                color: "bg-gradient-to-br from-emerald-600 to-teal-500"
              },
              {
                title: "Kesehatan Mental",
                icon: "🧠",
                description: "Berinteraksi dengan alam terbukti mengurangi stres, meningkatkan kreativitas, dan memperbaiki kesehatan mental.",
                color: "bg-gradient-to-br from-purple-500 to-fuchsia-400"
              },
              {
                title: "Warisan Budaya",
                icon: "🏛️",
                description: "Banyak budaya dan tradisi masyarakat adat terkait erat dengan alam dan kebijaksanaan dalam menjaga lingkungan sekitar.",
                color: "bg-gradient-to-br from-orange-500 to-amber-400"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={`${item.color} h-2 w-full`}></div>
                <div className="p-8">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-emerald-800">{item.title}</h3>
                  <p className="text-emerald-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-700 font-medium">
              <span className="font-bold text-emerald-800">Tahukah Anda?</span> Para ilmuwan memperkirakan ada sekitar 8.7 juta spesies di bumi, dan hanya 1.2 juta yang telah ditemukan dan diberi nama.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Threats Section */}
      <section 
        id="threats" 
        className="min-h-screen py-20 bg-gradient-to-b from-red-50 to-amber-50 relative"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-red-50 opacity-70 overflow-hidden">
          <div className="absolute -bottom-24 left-0 w-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-red-50 fill-current">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-red-200 text-red-800 text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              KONDISI DARURAT
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 text-red-900"
              whileHover={{ scale: 1.02 }}
            >
              Ancaman Terhadap Alam
            </motion.h2>
            <p className="text-lg text-red-700">
              Aktivitas manusia telah mengancam keseimbangan ekosistem dan kelangsungan hidup berbagai spesies di bumi.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {[
              {
                title: "Deforestasi",
                description: "Setiap tahun, 10 juta hektar hutan hilang - setara dengan 27 lapangan sepak bola setiap menit. Ini mengancam habitat satwa liar, mempercepat perubahan iklim, dan mengganggu siklus air vital.",
                stats: "10 juta hektar/tahun",
                color: "bg-red-600",
                icon: "🌲"
              },
              {
                title: "Polusi Lingkungan",
                description: "8 juta ton plastik berakhir di lautan setiap tahun, membunuh lebih dari 100.000 mamalia laut. Polusi udara menyebabkan 7 juta kematian prematur setiap tahunnya di seluruh dunia.",
                stats: "8 juta ton plastik/tahun",
                color: "bg-blue-600",
                icon: "🌊"
              },
              {
                title: "Perubahan Iklim",
                description: "Suhu global telah meningkat 1.1°C sejak era pra-industri, menyebabkan cuaca ekstrem, naiknya permukaan laut, dan kepunahan spesies yang tidak mampu beradaptasi.",
                stats: "1.1°C kenaikan suhu",
                color: "bg-orange-600",
                icon: "🌡️"
              },
              {
                title: "Kepunahan Spesies",
                description: "Kita sedang mengalami kepunahan massal ke-6, dengan tingkat kepunahan 100-1000 kali lebih tinggi dari tingkat alami. Sekitar 1 juta spesies terancam punah dalam beberapa dekade mendatang.",
                stats: "1 juta spesies terancam",
                color: "bg-purple-600",
                icon: "🦏"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="mb-12"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className={`${item.color} w-full md:w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl md:mt-2 shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-red-800">{item.title}</h3>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-red-400">
                      <p className="mb-4 text-gray-700 leading-relaxed">{item.description}</p>
                      <div className="flex items-center">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                          {item.stats}
                        </span>
                        <div className="ml-auto">
                          <motion.button
                            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            Baca selengkapnya 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="bg-red-600 text-white p-8 rounded-xl shadow-xl max-w-5xl mx-auto mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">⏰</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Waktu Kita Terbatas</h3>
                <p className="text-red-100">
                  Para ilmuwan memperingatkan bahwa kita hanya memiliki sedikit waktu untuk mencegah kerusakan permanen pada planet kita. Kita perlu bertindak sekarang.
                </p>
              </div>
              <motion.button
                className="md:ml-auto bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-full font-medium whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("actions")}
              >
                Lihat Solusi
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Actions Section */}
      <section 
        id="actions" 
        className="min-h-screen py-20 bg-gradient-to-b from-blue-50 to-cyan-50 relative"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-blue-200 opacity-50 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-cyan-200 opacity-50 -ml-16 -mb-16"></div>
        
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              PERUBAHAN DIMULAI DARI DIRI SENDIRI
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900"
              whileHover={{ scale: 1.02 }}
            >
              Aksi Yang Bisa Kita Lakukan
            </motion.h2>
            <p className="text-lg text-blue-700">
              Setiap tindakan kecil yang kita lakukan dapat berdampak besar bagi kelestarian lingkungan. Mari ambil peran aktif!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "Kurangi Jejak Karbon",
                icon: "👣",
                color: "bg-gradient-to-br from-emerald-500 to-emerald-400",
                actions: [
                  "Gunakan transportasi umum atau bersepeda ke tempat kerja",
                  "Kurangi konsumsi daging minimal 1-2 hari per minggu",
                  "Beralih ke sumber energi terbarukan untuk rumah",
                  "Matikan peralatan elektronik saat tidak digunakan"
                ]
              },
              {
                title: "Kelola Sampah",
                icon: "🗑️",
                color: "bg-gradient-to-br from-amber-500 to-amber-400",
                actions: [
                  "Kurangi penggunaan plastik sekali pakai dengan botol & kantong reusable",
                  "Pisahkan sampah organik dan anorganik di rumah",
                  "Praktikkan daur ulang dan kompos untuk kebun mini",
                  "Ikut kampanye clean-up di pantai atau taman lokal"
                ]
              },
              {
                title: "Dukung Konservasi",
                icon: "🛡️",
                color: "bg-gradient-to-br from-blue-500 to-blue-400",
                actions: [
                  "Donasi rutin ke organisasi lingkungan tepercaya",
                  "Tanam pohon lokal di lingkungan sekitar",
                  "Edukasi keluarga dan teman tentang isu lingkungan",
                  "Pilih produk bersertifikat ramah lingkungan"
                ]
              },
              {
                title: "Hidup Berkelanjutan",
                icon: "♻️",
                color: "bg-gradient-to-br from-purple-500 to-purple-400",
                actions: [
                  "Gunakan peralatan dan pakaian yang tahan lama",
                  "Beli produk pangan lokal dan musiman",
                  "Perbaiki barang yang rusak daripada langsung menggantinya",
                  "Kurangi konsumsi berlebihan dan belanja bijak"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`${item.color} h-2 w-full`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{item.icon}</span>
                    <h3 className="text-2xl font-bold text-blue-800">{item.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {item.actions.map((action, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-emerald-500 mr-3 font-bold">✓</span>
                        <span className="text-gray-700">{action}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                    whileHover={{ x: 3 }}
                  >
                    Lihat panduan lengkap 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div 
            className="mt-16 max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                  Bergabunglah dalam Gerakan Penyelamatan Bumi
                </h3>
                <p className="text-blue-100">
                  Jadilah bagian dari komunitas LestariAlam dan bersama-sama mewujudkan kehidupan yang selaras dengan alam.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <motion.button
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Gabung Sekarang!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="min-h-screen py-20 bg-gradient-to-b from-purple-50 to-violet-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-purple-200 text-purple-800 text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              LEBIH DEKAT DENGAN KAMI
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 text-purple-900"
              whileHover={{ scale: 1.02 }}
            >
              Tentang LestariAlam
            </motion.h2>
            <p className="text-lg text-purple-700">
              Organisasi yang berdedikasi untuk pelestarian alam dan memperjuangkan keberlanjutan lingkungan di Indonesia.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
            <motion.div
              className="md:w-1/2 bg-white p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="border-l-4 border-purple-500 pl-6 mb-6">
                <h3 className="text-2xl font-bold text-purple-800">Visi Kami</h3>
                <p className="text-gray-700 mt-3">
                  Menciptakan dunia di mana manusia hidup harmonis dengan alam, menghargai dan melindungi keanekaragaman hayati untuk generasi mendatang.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-bold text-purple-800">Misi Kami</h3>
                <ul className="mt-3 space-y-3">
                  {[
                    "Meningkatkan kesadaran masyarakat tentang pentingnya menjaga kelestarian alam",
                    "Mendorong aksi nyata pelestarian lingkungan di berbagai lapisan masyarakat",
                    "Membangun komunitas peduli lingkungan di seluruh Indonesia",
                    "Bekerja sama dengan berbagai pihak untuk menciptakan solusi berkelanjutan"
                  ].map((item, index) => (
                    <motion.li key={index} className="flex items-start text-gray-700">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex flex-col gap-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Pencapaian Kami</h3>
                <ul className="space-y-3">
                  {[
                    "50,000+ pohon ditanam di seluruh Indonesia",
                    "100+ komunitas lingkungan yang diberdayakan",
                    "25+ proyek konservasi yang berhasil dilaksanakan",
                    "10.000+ relawan aktif di berbagai daerah"
                  ].map((item, index) => (
                    <motion.li key={index} className="flex items-center" whileHover={{ x: 5 }}>
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs mr-3">{index + 1}</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-purple-800">Bergabung Dengan Kami</h3>
                <p className="text-gray-700 mb-6">
                  Setiap tindakan kecil Anda berarti. Bersama, kita bisa membuat perubahan besar untuk bumi kita.
                </p>
                
                <motion.div className="flex flex-wrap gap-4">
                  <motion.button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Jadi Relawan
                  </motion.button>
                  <motion.button
                    className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Donasi
                  </motion.button>
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hubungi Kami
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Testimonials */}
          <motion.div 
            className="mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-purple-900">Yang Mereka Katakan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Budi Santoso",
                  role: "Relawan",
                  text: "Bergabung dengan LestariAlam mengubah cara pandang saya terhadap lingkungan. Kini saya lebih sadar akan pentingnya menjaga alam.",
                  avatar: "👨‍🌾"
                },
                {
                  name: "Siti Rahma",
                  role: "Pendukung",
                  text: "Program edukasi LestariAlam sangat inspiratif. Anak-anak saya kini lebih peduli terhadap sampah dan lingkungan sekitar.",
                  avatar: "👩‍🏫"
                },
                {
                  name: "Ahmad Fauzi",
                  role: "Mitra",
                  text: "Sebagai mitra bisnis, kami bangga mendukung program-program LestariAlam yang memiliki dampak nyata bagi masyarakat dan lingkungan.",
                  avatar: "👨‍💼"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                      {item.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-purple-900">{item.name}</h4>
                      <p className="text-sm text-purple-600">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{item.text}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Dapatkan Informasi Terbaru</h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan informasi, tips, dan berita terbaru seputar pelestarian lingkungan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="w-full px-6 py-3 rounded-full border text-white border-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <motion.button
                className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Berlangganan
              </motion.button>
            </div>
            <p className="text-xs text-emerald-200 mt-4">
              Kami menghargai privasi Anda. Kami tidak akan pernah membagikan email Anda kepada pihak ketiga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <motion.div 
                className="flex items-center mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold">Lestari<span className="text-emerald-300">Alam</span></h3>
              </motion.div>
              <p className="text-emerald-200 mb-6">
                Bersama kita jaga bumi untuk generasi mendatang.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "📱", label: "Instagram" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📘", label: "Facebook" },
                  { icon: "📺", label: "YouTube" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
                    whileHover={{ y: -3 }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-emerald-800 pb-2">Tautan Cepat</h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={`#${item.id}`} 
                      className="text-emerald-200 hover:text-emerald-300 transition-colors flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-emerald-800 pb-2">Program Kami</h4>
              <ul className="space-y-2 text-emerald-200">
                <motion.li whileHover={{ x: 5 }}><a href="#" className="hover:text-emerald-300 transition-colors">Penanaman Pohon</a></motion.li>
                <motion.li whileHover={{ x: 5 }}><a href="#" className="hover:text-emerald-300 transition-colors">Edukasi Lingkungan</a></motion.li>
                <motion.li whileHover={{ x: 5 }}><a href="#" className="hover:text-emerald-300 transition-colors">Kampanye Zero Waste</a></motion.li>
                <motion.li whileHover={{ x: 5 }}><a href="#" className="hover:text-emerald-300 transition-colors">Konservasi Satwa</a></motion.li>
                <motion.li whileHover={{ x: 5 }}><a href="#" className="hover:text-emerald-300 transition-colors">Pemberdayaan Masyarakat</a></motion.li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-emerald-800 pb-2">Kontak</h4>
              <ul className="space-y-3 text-emerald-200">
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  <span>Email: info@lestarialam.org</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📞</span>
                  <span>Telepon: +62 123 4567 890</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span>Jl. Konservasi No. 1, Jakarta Selatan, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>  
          
          <div className="border-t border-emerald-800 mt-10 pt-6 text-center text-emerald-300">
            <p>© {new Date().getFullYear()} LestariAlam. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollY > 300 ? 1 : 0,
          y: scrollY > 300 ? 0 : 20
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>

    </div>
  );
};

export default App;