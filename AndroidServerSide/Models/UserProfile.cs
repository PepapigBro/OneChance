using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AndroidServerSide.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        //About me
        public string Avatar1Path { get; set; }
        public string Avatar2Path { get; set; }
        public string Avatar3Path { get; set; }
        public string Avatar4Path { get; set; }
        public string Avatar5Path { get; set; }

        public DateTime BithDate { get; set; }
        public double GPSlat { get; set; }
        public double GPSlon { get; set; }

        public int CountryId { get; set; }
        public int CityId { get; set; }

        public int Height { get; set; }
        public int Weight { get; set; }

        public BodyTypes BodyType { get; set; }
        public EducationTypes EducationType { get; set; }

        public Languages Language { get; set; }
        public FamilyStatuses FamilyStatus { get; set; }
        public ChildrenStatuses ChildrenStatus { get; set; }

        public SmokingStatuses SmokingStatus { get; set; }
        public AlcoStatuses AlcoStatus { get; set; }

        //About Companero
        public string SuitableForMeIf { get; set; }
        public string NotSuitableForMeIf { get; set; }
        public AgeRange AgeRange { get; set; }
        public AgeAdditions AgeAddition { get; set; }

        //App activity - 5bytes
        public byte IntentsCount { get; set; }
        public int RespondedCount { get; set; }
        public int realMeetingCount{ get; set; }
        public int likeCount { get; set; }
        public int ReviewsCount { get; set; }

    }

    public enum AgeAdditions :byte
    {
        allowedLess=1,
        allowedMore=2,
        possibleLessAndMore=4,
        onlySpecified=8
    }

    public enum AgeRange :byte
    {
        from16to18=1,
        from18to20 = 2,
        from20to25 = 4,
        from25to30 = 8,
        from30to35 = 16,
        from35to45 = 32,
        from45to55 = 64,
        from55andMore = 128
    }

    public enum BodyTypes :byte
    {
        average=0,
        thin=1,
        athletic=2,
        shapely=3,
        mass=4,
        tight=5,
        bodybuilder=6
    }

    public enum EducationTypes :byte
    {
        higher=0,
        secondary=1
    }

    public enum Languages :byte
    {
        russian=1,
        english=2,
        german=4

    }

    public enum FamilyStatuses :byte
    {
        single=0,
        isMarried=1
    }

    public enum ChildrenStatuses :byte
    {
        noChildren=0,
        hasChildren=1,
        liveSeparately=2
    }

    public enum SmokingStatuses : byte
    {
        dontsmoke = 0,
        smoke = 1
    }

    public enum AlcoStatuses :byte
    {
        drink=0,
        dontdrink=1
    }

}