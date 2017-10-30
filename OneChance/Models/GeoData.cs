namespace OneChance
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.ComponentModel.DataAnnotations;




    public partial class GeoDataContext : DbContext
    {
        public GeoDataContext()
            : base("name=GeoData")
        {
        }

        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Region> Regions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>()
                .Property(e => e.title_ru)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_ua)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_be)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_en)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_es)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_pt)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_de)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_fr)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_it)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_pl)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_ja)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_lt)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_lv)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.title_cz)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_ru)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_ru)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_ru)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_ua)
                .IsUnicode(false);

          // modelBuilder.Entity<City>()
          //     .Property(e => e.area_ua)
          //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_ua)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_be)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_be)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_be)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_en)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_en)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_en)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_es)
                .IsUnicode(false);

          // modelBuilder.Entity<City>()
          //     .Property(e => e.area_es)
          //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_es)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_pt)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_pt)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_pt)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_de)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_de)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_de)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_fr)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_fr)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_fr)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_it)
                .IsUnicode(false);

          // modelBuilder.Entity<City>()
          //     .Property(e => e.area_it)
          //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_it)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_pl)
                .IsUnicode(false);

          //  modelBuilder.Entity<City>()
          //      .Property(e => e.area_pl)
          //      .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_pl)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_ja)
                .IsUnicode(false);

           // modelBuilder.Entity<City>()
           //     .Property(e => e.area_ja)
           //     .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_ja)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_lt)
                .IsUnicode(false);

          //  modelBuilder.Entity<City>()
          //      .Property(e => e.area_lt)
          //      .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_lt)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_lv)
                .IsUnicode(false);

          //  modelBuilder.Entity<City>()
          //      .Property(e => e.area_lv)
          //      .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_lv)
                .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.title_cz)
                .IsUnicode(false);

          //  modelBuilder.Entity<City>()
          //      .Property(e => e.area_cz)
          //      .IsUnicode(false);

            modelBuilder.Entity<City>()
                .Property(e => e.region_cz)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_ru)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_ua)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_be)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_en)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_es)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_pt)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_de)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_fr)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_it)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_pl)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_ja)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_lt)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_lv)
                .IsUnicode(false);

            modelBuilder.Entity<Region>()
                .Property(e => e.title_cz)
                .IsUnicode(false);
        }
    }

    public class CityForView
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Region { get; set; }
    }
    public class CountryForView
    {
        public string Name { get; set; }
        public int Id { get; set; }
        
    }

    

    [Table("geodata._cities")]
    public partial class City
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int city_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int country_id { get; set; }

        [Key]
        [Column(Order = 2)]
        public bool important { get; set; }

        public int? region_id { get; set; }

        [StringLength(150)]
        public string title_ru { get; set; }

       // [StringLength(150)]
       // public string area_ru { get; set; }

        [StringLength(150)]
        public string region_ru { get; set; }

        [StringLength(150)]
        public string title_ua { get; set; }

       // [StringLength(150)]
       // public string area_ua { get; set; }

        [StringLength(150)]
        public string region_ua { get; set; }

        [StringLength(150)]
        public string title_be { get; set; }

       //[StringLength(150)]
       //public string area_be { get; set; }

        [StringLength(150)]
        public string region_be { get; set; }

        [StringLength(150)]
        public string title_en { get; set; }

       //[StringLength(150)]
       //public string area_en { get; set; }

        [StringLength(150)]
        public string region_en { get; set; }

        [StringLength(150)]
        public string title_es { get; set; }

       // [StringLength(150)]
       // public string area_es { get; set; }

        [StringLength(150)]
        public string region_es { get; set; }

        [StringLength(150)]
        public string title_pt { get; set; }

      //  [StringLength(150)]
      //  public string area_pt { get; set; }

        [StringLength(150)]
        public string region_pt { get; set; }

        [StringLength(150)]
        public string title_de { get; set; }

      // [StringLength(150)]
      // public string area_de { get; set; }

        [StringLength(150)]
        public string region_de { get; set; }

        [StringLength(150)]
        public string title_fr { get; set; }

       // [StringLength(150)]
       // public string area_fr { get; set; }

        [StringLength(150)]
        public string region_fr { get; set; }

        [StringLength(150)]
        public string title_it { get; set; }

       // [StringLength(150)]
       // public string area_it { get; set; }

        [StringLength(150)]
        public string region_it { get; set; }

        [StringLength(150)]
        public string title_pl { get; set; }

      // [StringLength(150)]
      // public string area_pl { get; set; }

        [StringLength(150)]
        public string region_pl { get; set; }

        [StringLength(150)]
        public string title_ja { get; set; }

      //  [StringLength(150)]
      //  public string area_ja { get; set; }

        [StringLength(150)]
        public string region_ja { get; set; }

        [StringLength(150)]
        public string title_lt { get; set; }

       // [StringLength(150)]
       // public string area_lt { get; set; }

        [StringLength(150)]
        public string region_lt { get; set; }

        [StringLength(150)]
        public string title_lv { get; set; }

      // [StringLength(150)]
      // public string area_lv { get; set; }

        [StringLength(150)]
        public string region_lv { get; set; }

        [StringLength(150)]
        public string title_cz { get; set; }

      // [StringLength(150)]
      // public string area_cz { get; set; }

        [StringLength(150)]
        public string region_cz { get; set; }
    }

    [Table("geodata._regions")]
    public partial class Region
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int region_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int country_id { get; set; }

        [StringLength(150)]
        public string title_ru { get; set; }

        [StringLength(150)]
        public string title_ua { get; set; }

        [StringLength(150)]
        public string title_be { get; set; }

        [StringLength(150)]
        public string title_en { get; set; }

        [StringLength(150)]
        public string title_es { get; set; }

        [StringLength(150)]
        public string title_pt { get; set; }

        [StringLength(150)]
        public string title_de { get; set; }

        [StringLength(150)]
        public string title_fr { get; set; }

        [StringLength(150)]
        public string title_it { get; set; }

        [StringLength(150)]
        public string title_pl { get; set; }

        [StringLength(150)]
        public string title_ja { get; set; }

        [StringLength(150)]
        public string title_lt { get; set; }

        [StringLength(150)]
        public string title_lv { get; set; }

        [StringLength(150)]
        public string title_cz { get; set; }
    }

    [Table("geodata._countries")]
    public partial class Country
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int country_id { get; set; }

        [StringLength(60)]
        public string title_ru { get; set; }

        [StringLength(60)]
        public string title_ua { get; set; }

        [StringLength(60)]
        public string title_be { get; set; }

        [StringLength(60)]
        public string title_en { get; set; }

        [StringLength(60)]
        public string title_es { get; set; }

        [StringLength(60)]
        public string title_pt { get; set; }

        [StringLength(60)]
        public string title_de { get; set; }

        [StringLength(60)]
        public string title_fr { get; set; }

        [StringLength(60)]
        public string title_it { get; set; }

        [StringLength(60)]
        public string title_pl { get; set; }

        [StringLength(60)]
        public string title_ja { get; set; }

        [StringLength(60)]
        public string title_lt { get; set; }

        [StringLength(60)]
        public string title_lv { get; set; }

        [StringLength(60)]
        public string title_cz { get; set; }
    }
}
