import {Option} from '../models/option';

export const GenderOptions: Option[] = [
	{ key: "01", display: "Laki - laki" },
	{ key: "02", display: "Perempuan" }
];

export const CalcMethodOptions: Option[] = [
	{ key: "A", display: "Land Area" },
	{ key: "B", display: "Build Area" },
	{ key: "L", display: "Lumpsum" }
]

export const IntervalTypeOptions: Option[] = [
	{ key: "D", display: "Day" },
	{ key: "M", display: "Month" },
	{ key: "Y", display: "Year" },
]

export const EducationOptions: Option[] = [
	{ key: "01", display: "Tidak / Belum Sekolah"},
	{ key: "02", display: "Belum Tamat SD / Sederajat"},
	{ key: "03", display: "Tamat SD / Sederajat"},
	{ key: "04", display: "SLTP / Sederajat" },
	{ key: "05", display: "SLTA / Sederajat" },
	{ key: "06", display: "Diploma I / II" },
	{ key: "07", display: "Akademi / Diploma III / Sarjana Muda"},
	{ key: "08", display: "Diploma IV / Sastra I"},
	{ key: "09", display: "Sastra II" },
	{ key: "10", display: "Sastra III" },
]

export const FamilyRelationOptions: Option[] = [
	{ key: "01", display: "Kepala Keluarga" },
	{ key: "02", display: "Suami" },
	{ key: "03", display: "Istri" },
	{ key: "04", display: "SLTP / Sederajat" },
	{ key: "05", display: "Anak" },
	{ key: "06", display: "Menantu" },
	{ key: "07", display: "Orangtua" },
	{ key: "08", display: "Mertua" },
	{ key: "09", display: "Family Lain" },
	{ key: "10", display: "Pembantu" },
	{ key: "11", display: "Lainnya" }
]

export const ReligionOptions: Option[] = [
	{ key: "01", display: "Islam" },
	{ key: "02", display: "Kristen" },
	{ key: "03", display: "Katholik" },
	{ key: "04", display: "Budha" },
	{ key: "05", display: "Penghayat Kepercayaan" },
]

export const MaritalStatusOptions: Option[] = [
	{ key: "01", display: "Belum Kawin" },
	{ key: "02", display: "Kawin" },
	{ key: "03", display: "Cerai Hidup" },
	{ key: "04", display: "Cerai Mati" }
]

export const BloodTypeOptions: Option[] = [
	{ key: "01", display: "A" },
	{ key: "02", display: "B" },
	{ key: "03", display: "AB" },
	{ key: "04", display: "O" },
	{ key: "05", display: "A+" },
	{ key: "06", display: "B+" },
]

export const NationalityOptions: Option[] = [
	{ key: "01", display: "WNA" },
	{ key: "02", display: "WNI" }
]

export const TrxClassOptions: Option[] = [
	{ key: "I", display: "Invoice" },
	{ key: "R", display: "Receipt" },
	{ key: "p", display: "Payment" }
]
