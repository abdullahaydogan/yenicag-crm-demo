using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Core.Entity;

namespace YeniCag.Crm.Persistance.SeedData
{
    public static class SeedDataInitializer
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Teacher>().HasData(
                new Teacher
                {
                    Id = 1,
                    Name = "Mustafa",
                    Surname = "Kara",
                    Email = "mustafa.kara@yenicagkurs.com",
                    PhoneNumber = "5551112233",
                    Branch = "Sınıf Öğretmeni",
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Teacher
                {
                    Id = 2,
                    Name = "Zeynep",
                    Surname = "Aydın",
                    Email = "zeynep.aydin@yenicagkurs.com",
                    PhoneNumber = "5554445566",
                    Branch = "Türkçe",
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Teacher
                {
                    Id = 3,
                    Name = "Emre",
                    Surname = "Demir",
                    Email = "emre.demir@yenicagkurs.com",
                    PhoneNumber = "5557778899",
                    Branch = "Matematik",
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                }
            );

            modelBuilder.Entity<Course>().HasData(
                new Course
                {
                    Id = 1,
                    Name = "İlk Öğretim Destek Programı",
                    Description = "Öğrenmeyi sevdiren, özgüven geliştiren ilkokul eğitim modeli. İlkokul öğrencilerine yönelik programlarımızda akademik gelişimin yanında iletişim, özgüven ve problem çözme becerileri de desteklenir. Eğlenceli ve interaktif öğrenme modeli uygulanır.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 1,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Course
                {
                    Id = 2,
                    Name = "5, 6 ve 7. Sınıf Programı",
                    Description = "Okul başarısını güçlendiren modern ortaokul destek programı. 5, 6 ve 7. sınıf öğrencileri için hazırlanan programlarımız; temel derslerde güçlü akademik altyapı oluşturmayı, düzenli çalışma alışkanlığı kazandırmayı ve öğrencileri LGS sürecine hazırlamayı hedefler.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 3,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Course
                {
                    Id = 3,
                    Name = "LGS Hazırlık Programı",
                    Description = "Yoğunlaştırılmış LGS hazırlık sistemi, birebir takip ve deneme analizi. Yeni Çağ Kurs Merkezi’nin LGS hazırlık programı; öğrencilerin akademik eksiklerini analiz eden, düzenli deneme sınavlarıyla gelişimi takip eden ve birebir etüt sistemiyle başarıyı artıran kapsamlı bir eğitim modelidir. Öğrencilerimize sadece konu anlatımı değil; soru çözüm stratejileri, zaman yönetimi, motivasyon ve sınav psikolojisi desteği de sunuyoruz.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 3,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Course
                {
                    Id = 4,
                    Name = "Kitap Kulübü",
                    Description = "Okuma kültürü, yorumlama ve düşünme becerileri geliştiren özel kulüp. Yeni Çağ Kitap Kulübü öğrencilerin kitap okuma alışkanlığı kazanmasını, yorumlama becerilerini geliştirmesini ve düşünsel gelişimlerini desteklemeyi amaçlar.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 2,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Course
                {
                    Id = 5,
                    Name = "Erken Kayıt Avantajları",
                    Description = "Yeni dönem kayıtlarında özel indirim ve avantaj fırsatları. Erken kayıt sistemi ile öğrencilerimiz avantajlı fiyatlardan yararlanırken aynı zamanda eğitim planlamasını erkenden oluşturma fırsatı elde eder.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 1,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Course
                {
                    Id = 6,
                    Name = "Ödev Evi",
                    Description = "Ders sonrası kontrollü çalışma ve ödev destek sistemi. Ödev Evi programımız öğrencilerin ders dışındaki çalışma süreçlerini daha verimli hale getirir. Öğretmen eşliğinde ödev takibi ve konu tekrar desteği sunulur.",
                    Price = 0,
                    IsActive = true,
                    TeacherId = 1,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student
                {
                    Id = 1,
                    Name = "Ahmet",
                    Surname = "Yılmaz",
                    Email = "ahmet.yilmaz@gmail.com",
                    PhoneNumber = "5551112233",
                    DateOfBirth = new DateOnly(2008, 3, 15),
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Student
                {
                    Id = 2,
                    Name = "Ayşe",
                    Surname = "Demir",
                    Email = "ayse.demir@gmail.com",
                    PhoneNumber = "5554445566",
                    DateOfBirth = new DateOnly(2009, 7, 22),
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                },
                new Student
                {
                    Id = 3,
                    Name = "Mehmet",
                    Surname = "Kaya",
                    Email = "mehmet.kaya@gmail.com",
                    PhoneNumber = "5557778899",
                    DateOfBirth = new DateOnly(2010, 1, 10),
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 5, 9, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedDate = null
                }
            );

            modelBuilder.Entity("CourseStudent").HasData(
                new { CoursesId = 3, StudentsId = 1 },
                new { CoursesId = 2, StudentsId = 1 },
                new { CoursesId = 1, StudentsId = 2 },
                new { CoursesId = 6, StudentsId = 2 },
                new { CoursesId = 4, StudentsId = 3 },
                new { CoursesId = 5, StudentsId = 3 }
            );
        }
    }
}