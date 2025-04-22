namespace Image_Gallery_POC.Models;

using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public partial class ThirdLightResponseModel
{
    [JsonProperty("response")]
    public Response[] Response { get; set; }
}

public partial class Response
{
    [JsonProperty("canViewOriginal")]
    public bool CanViewOriginal { get; set; }

    [JsonProperty("createdDate")]
    public EdDate CreatedDate { get; set; }

    [JsonProperty("filename")]
    public string Filename { get; set; }

    [JsonProperty("fileSizeBytes")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long FileSizeBytes { get; set; }

    [JsonProperty("fileType")]
    public FileType FileType { get; set; }

    [JsonProperty("id")]
    public Guid Id { get; set; }

    [JsonProperty("isDerivative")]
    public bool IsDerivative { get; set; }

    [JsonProperty("media")]
    public Media Media { get; set; }

    [JsonProperty("modifiedDate")]
    public EdDate ModifiedDate { get; set; }

    [JsonProperty("originalAssetId")]
    public object OriginalAssetId { get; set; }

    [JsonProperty("ownerId")]
    public Guid OwnerId { get; set; }

    [JsonProperty("parentId")]
    public Guid ParentId { get; set; }

    [JsonProperty("revisionNumber")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long RevisionNumber { get; set; }

    [JsonProperty("thumbnails")]
    public Thumbnails Thumbnails { get; set; }
}

public partial class EdDate
{
    [JsonProperty("rfc3339")]
    public DateTimeOffset Rfc3339 { get; set; }

    [JsonProperty("timestamp")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long Timestamp { get; set; }
}

public partial class Media
{
    [JsonProperty("image")]
    public Image Image { get; set; }
}

public partial class Image
{
    [JsonProperty("height")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long Height { get; set; }

    [JsonProperty("width")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long Width { get; set; }
}

public partial class Thumbnails
{
    [JsonProperty("large")]
    public Large Large { get; set; }

    [JsonProperty("medium")]
    public Large Medium { get; set; }

    [JsonProperty("small")]
    public Large Small { get; set; }
}

public partial class Large
{
    [JsonProperty("height")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long Height { get; set; }

    [JsonProperty("url")]
    public Uri Url { get; set; }

    [JsonProperty("width")]
    [JsonConverter(typeof(ParseStringConverter))]
    public long Width { get; set; }
}

public enum FileType { Picture };

internal static class Converter
{
    public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
    {
        MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        DateParseHandling = DateParseHandling.None,
        Converters =
            {
                FileTypeConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
    };
}

internal class ParseStringConverter : JsonConverter
{
    public override bool CanConvert(Type t) => t == typeof(long) || t == typeof(long?);

    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null) return null;
        var value = serializer.Deserialize<string>(reader);
        long l;
        if (Int64.TryParse(value, out l))
        {
            return l;
        }
        throw new Exception("Cannot unmarshal type long");
    }

    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    {
        if (untypedValue == null)
        {
            serializer.Serialize(writer, null);
            return;
        }
        var value = (long)untypedValue;
        serializer.Serialize(writer, value.ToString());
        return;
    }

    public static readonly ParseStringConverter Singleton = new ParseStringConverter();
}

internal class FileTypeConverter : JsonConverter
{
    public override bool CanConvert(Type t) => t == typeof(FileType) || t == typeof(FileType?);

    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null) return null;
        var value = serializer.Deserialize<string>(reader);
        if (value == "PICTURE")
        {
            return FileType.Picture;
        }
        throw new Exception("Cannot unmarshal type FileType");
    }

    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    {
        if (untypedValue == null)
        {
            serializer.Serialize(writer, null);
            return;
        }
        var value = (FileType)untypedValue;
        if (value == FileType.Picture)
        {
            serializer.Serialize(writer, "PICTURE");
            return;
        }
        throw new Exception("Cannot marshal type FileType");
    }

    public static readonly FileTypeConverter Singleton = new FileTypeConverter();
}
