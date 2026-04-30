import React, { useEffect } from "react";
import WelcomeLayout from "../Layouts/WelcomeLayout";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Zap,
    Globe,
    ArrowRight,
    CheckCircle2,
    Settings,
    Truck,
    ScrollText,
    Users,
    Factory,
    Layers,
} from "lucide-react";
import { Link, usePage, Head } from "@inertiajs/react"; // Head ইম্পোর্ট করা হয়েছে
import toast, { Toaster } from "react-hot-toast";

function Welcome() {
    const { flash } = usePage().props; // লারাভেল থেকে আসা ফ্ল্যাশ মেসেজ

    useEffect(() => {
        // যদি রেজিস্ট্রেশনের পর কোনো সাকসেস মেসেজ থাকে তবে টোস্ট দেখাবে
        if (flash && flash.success) {
            toast.success(flash.success, {
                style: {
                    background: "#0F1219",
                    color: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
                iconTheme: {
                    primary: "#3B82F6",
                    secondary: "#fff",
                },
                duration: 6000,
            });
        }
    }, [flash]);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
    };

    return (
        <WelcomeLayout>
            {/* ব্রাউজার ট্যাব টাইটেল সেট করার জন্য Head ব্যবহার */}
            <Head title="Premium Fabric Standards | TextileMS" />

            {/* টোস্ট মেসেজ দেখানোর কন্টেইনার */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* --- Hero Section --- */}
            <section
                id="hero"
                className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 bg-[#0F1219]"
            >
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            <Zap size={14} /> Global Supply Chain
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
                            Elevating <br />{" "}
                            <span className="text-blue-500">Fabric</span>{" "}
                            Standards.
                        </h1>
                        <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Integrate your fashion brand with the world's most
                            sophisticated textile management system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
                            >
                                Become a Buyer{" "}
                                <ArrowRight
                                    size={22}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group hidden lg:block"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#080B11] border border-white/5 rounded-[3rem] h-80 lg:h-[450px] flex items-center justify-center overflow-hidden text-center">
                            <div>
                                <p className="text-9xl font-black text-white/5 select-none">
                                    MS
                                </p>
                                <p className="text-blue-500 font-bold tracking-[0.5em] uppercase -mt-8">
                                    Textile Legacy
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Services Section --- */}
            <section id="solutions" className="py-24 bg-[#080B11]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Our Core Services
                        </h2>
                        <p className="text-slate-500 mb-16 max-w-2xl mx-auto">
                            We offer an end-to-end solution for international
                            fashion labels and clothing brands.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            {
                                title: "Custom Fabric Development",
                                icon: <Factory />,
                                desc: "We develop custom blends, textures, and patterns tailored to your brand's unique identity.",
                            },
                            {
                                title: "Bulk Manufacturing",
                                icon: <Layers />,
                                desc: "High-scale production lines capable of delivering thousands of units per month.",
                            },
                            {
                                title: "Smart Inventory",
                                icon: <Settings />,
                                desc: "Track your production and fabric stock in real-time through our AI-integrated portal.",
                            },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="p-10 bg-[#0F1219] rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all"
                            >
                                <div className="text-blue-500 mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Order Process (Step-by-Step) --- */}
            <section className="py-24 bg-[#0F1219]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 text-center lg:text-left">
                        How We Work
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4 relative">
                        {[
                            {
                                step: "01",
                                title: "Join as Buyer",
                                icon: <Users />,
                                desc: "Apply for a buyer account to access our exclusive catalogs.",
                            },
                            {
                                step: "02",
                                title: "Selection",
                                icon: <ScrollText />,
                                desc: "Choose your fabric types and request custom samples.",
                            },
                            {
                                step: "03",
                                title: "Production",
                                icon: <Factory />,
                                desc: "Monitor the weaving and dyeing process via your dashboard.",
                            },
                            {
                                step: "04",
                                title: "Global Delivery",
                                icon: <Truck />,
                                desc: "Consignments are shipped with real-time global tracking.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-8 rounded-3xl bg-[#080B11] border border-white/5"
                            >
                                <span className="text-4xl font-black text-white/10 absolute top-4 right-6">
                                    {item.step}
                                </span>
                                <div className="text-blue-500 mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Legacy Section --- */}
            <section id="legacy" className="py-24 bg-[#080B11]">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-64 rounded-3xl overflow-hidden border border-blue-500/20 group">
                            <img
                                src="assets/images/technical_textile.webp"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h4 className="text-white font-bold text-sm leading-tight">
                                    Innovation Since 1998
                                </h4>
                            </div>
                        </div>

                        <div className="relative h-64 rounded-3xl overflow-hidden mt-12 border border-white/5 group">
                            <img
                                src="assets/images/images.jpg"
                                alt="Fabric Texture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-transparent to-transparent opacity-40"></div>
                        </div>
                    </div>

                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            A Heritage of Quality
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Based in the heart of the textile hub, we have spent
                            28 years perfecting the art of weaving. From
                            traditional cotton to modern eco-blends, our fabrics
                            power brands globally.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Certified Organic Cotton",
                                "Sustainable Dyeing Process",
                                "ISO 9001 Certified Quality",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 text-slate-300"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="text-blue-500"
                                    />{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* --- Final CTA Section --- */}
            <section id="contact" className="py-24 bg-[#0F1219]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-[3rem] p-12 lg:p-24 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">
                                Start Your Collection Today
                            </h2>
                            <p className="text-blue-100/70 text-lg mb-12 max-w-xl mx-auto">
                                Join hundreds of global brands sourcing premium
                                fabrics through our platform.
                            </p>
                            <Link
                                href="/register"
                                className="bg-white text-blue-900 px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform inline-flex items-center gap-3"
                            >
                                Apply as a Buyer <ArrowRight />
                            </Link>
                        </div>
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    </div>
                </div>
            </section>
        </WelcomeLayout>
    );
}

export default Welcome;
