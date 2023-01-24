type ICertificate = {
    id: number;
    name: string;
    type: "kejuaraan" | "kehadiran";
    publisherId: string;
    publisherName: string;
    point: number;
    createdAt: string;
}
const certificates: ICertificate[] = [
    {
        id: 1,
        name: "Finalis Lomba Coding",
        type: "kejuaraan",
        publisherId: "P001",
        publisherName: "EO Hack & Coding",
        point: 10,
        createdAt: '2014-10-05T14:48:00.000Z',
    },
    {
        id: 2,
        name: "Finalis Lomba Makan Kerupuk",
        type: "kejuaraan",
        publisherId: "P002",
        publisherName: "Panitia 17an Desa Juara",
        point: 20,
        createdAt: '2010-10-05T14:48:00.000Z',
    },
    {
        id: 3,
        name: "Juara 1 Lomba Panjat Pinang",
        type: "kejuaraan",
        publisherId: "P002",
        publisherName: "Panitia 17an Desa Jawara",
        point: 30,
        createdAt: '2022-10-05T14:48:00.000Z',
    },
    {
        id: 4,
        name: "Digital Marketing Sesi 1",
        type: "kehadiran",
        publisherId: "P003",
        publisherName: "EO Pelatihan",
        point: 5,
        createdAt: '2014-10-05T14:48:00.000Z',
    }
]

// 1. Urutkan data di atas berdasarkan tanggal pembuatan sertifikat (createdAt).
const sortedCertificates = certificates.sort((a, b) => (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime());
console.log(sortedCertificates);

// 2. Kelompokkan data di atas berdasarkan tahun dikeluarkannya sertifikat tersebut.
// Terdapat method experimental yakni .group() yang dapat melakukan hal ini, tetapi karena typescript sepertinya belum support saya akan menggunakan cara lain

const groupBy = <T>(array: T[], predicate: (value: T) => string) => {
  return array.reduce((res, value) => {
    (res[predicate(value)] ||= []).push(value);
    return res;
  }, {} as { [key: string]: T[] });
}
const result = groupBy(certificates, (val) => String(new Date(val.createdAt).getFullYear()));
console.log(result)

// 3. Hitunglah, berapa total point yang didapatkan Serti di masing-masing publisher?
const totalPoint = certificates.reduce((acc, val) => acc + val.point, 0);
console.log(totalPoint);

// 4. Apa yang salah dari data di atas? Bagaimana cara memperbaikinya?
// Terdapat 2 kemungkinan kesalahan yang terjadi:
// a. Deklarasi type yang salah, seharusnya properti createdAt dari ICertificate memiliki type string agar sesuai dengan tipe data dari sortedCertificates
//      Solusinya ada mengubah tipe createdAt dari ICertificate yang awalnya Date menjadi string
// b. Datanya memiliki tipe yang salah / tak sesuai dengan type yang dideklarasikan
//      Solusinya adalah mengubah tipe createdAt dalam certificates menjadi Date
//      Cth:
//      {
//          id: 1,
//          name: "Finalis Lomba Coding",
//          type: "kejuaraan",
//          publisherId: "P001",
//          publisherName: "EO Hack & Coding",
//          point: 10,
//          createdAt: new Date('2014-10-05T14:48:00.000Z'),
//      },
// Solusi yang saya terapkan adalah dengan mengasumsikan kesalahan yang terjadi adalah kesalahan A

export {}