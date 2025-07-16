import { Contact } from "@/lib/types";
import {
    FaPhone,
    FaEnvelope,
    FaLocationDot,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaTelegram,
    FaWhatsapp,
    FaGlobe,
    FaLinkedin,
    FaXTwitter,
    FaDiscord,
} from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";

export default function Footer({ contacts }: { contacts: Contact }) {
    return (
        <footer className="bg-gray-900 text-white py-2 px-2">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Contact Us */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm pl-4">
                        {contacts.phoneNumber && (
                            <li className="flex items-center gap-2">
                                <FaPhone size={18} className="text-gray-400" />
                                <a
                                    href={`tel:${contacts.phoneNumber}`}
                                    className="hover:underline hover:text-[var(--accent)]"
                                >
                                    {contacts.phoneNumber}
                                </a>
                            </li>
                        )}
                        {contacts.email && (
                            <li className="flex items-center gap-2">
                                <FaEnvelope size={18} className="text-gray-400" />
                                <a
                                    href={`mailto:${contacts.email}`}
                                    className="hover:underline hover:text-[var(--accent)]"
                                >
                                    {contacts.email}
                                </a>
                            </li>
                        )}
                        {contacts.location && (
                            <li className="flex items-center gap-2">
                                <FaLocationDot size={18} className="text-gray-400" />
                                <a
                                    href={contacts.location.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-[var(--accent)]"
                                >
                                    {contacts.location.label}
                                </a>
                            </li>
                        )}
                        {contacts.website && (
                            <li className="flex items-center gap-2">
                                <FaGlobe size={18} className="text-gray-400" />
                                <a
                                    href={contacts.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-[var(--accent)]"
                                >
                                    {contacts.website.replace(/^https?:\/\//, "")}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex flex-wrap gap-4 pl-8 md:max-w-[300px] md:gap-x-6 md:gap-y-4">
                        {contacts.facebook && (
                            <a
                                href={contacts.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-blue-600"
                            >
                                <FaFacebook size={20} />
                            </a>
                        )}
                        {contacts.instagram && (
                            <a
                                href={contacts.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-pink-500"
                            >
                                <FaInstagram size={20} />
                            </a>
                        )}
                        {contacts.youtube && (
                            <a
                                href={contacts.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-red-600"
                            >
                                <FaYoutube size={20} />
                            </a>
                        )}
                        {contacts.tiktok && (
  <a
    href={contacts.tiktok}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[var(--accent)] text-white"
    style={{
      filter: "drop-shadow(0 -1px 1px rgba(0, 191, 255, 0.7)) drop-shadow(0 1px 1px rgba(255, 99, 132, 0.6))"
    }}
  >
    <FaTiktok size={18} />
  </a>
)}

                        {contacts.telegram && (
                            <a
                                href={contacts.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-sky-500"
                            >
                                <FaTelegram size={20} />
                            </a>
                        )}
                        {contacts.whatsUp && (
                            <a
                                href={contacts.whatsUp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-green-500"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                        )}
                        {contacts.linkedin && (
                            <a
                                href={contacts.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-blue-700"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        )}
                        {contacts.x && (
                            <a
                                href={contacts.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-white"
                            >
                                <FaXTwitter size={20} />
                            </a>
                        )}
                        {contacts.snapchat && (
                            <a
                                href={contacts.snapchat}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-yellow-400"
                            >
                                <FaSnapchatGhost size={20} />
                            </a>
                        )}
                        {contacts.discord && (
                            <a
                                href={contacts.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent)] text-indigo-400"
                            >
                                <FaDiscord size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-gray-400 text-xs mt-8">
                <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
                <div>
                    <h3 className="text-xs">
                        Powered By{" "}
                        <a
                            href="https://menumaya.local"
                            className="text-[var(--accent)] hover:underline text-sm pl-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            MenuMaya
                        </a>
                    </h3>
                </div>
            </div>
        </footer>
    );
}