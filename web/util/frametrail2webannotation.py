#! /usr/bin/python

"""Convert FrameTrail annotations to WebAnnotation data model.

This code is licensed under the same terms as the FrameTrails software.

Copyright (c) 2017 Olivier Aubert <contact@olivieraubert.net>
"""

import datetime
import json
import time
from collections import OrderedDict

# Define a mapping between FrameTrail type and WebAnnotation general
# content types
bodytype_mapping = {
    'image': 'Image',
    'webpage': 'Text',
    'wikipedia': 'Text',
    'youtube': 'Video',
    'video': 'Video',
    'vimeo': 'Video',
}
def generate_body(a, basename):
    """Generate the body for a given frametrail annotation.
    """
    if a['type'] == 'text':
        res = OrderedDict((
            ("type", 'Text'),
            ("value", a["text"]),
            ("format", "text/plain"),
            ("frametrail:name", a['name']),
            ("frametrail:thumb", a['thumb']),
        ))
        return res
    elif a['type'] in bodytype_mapping:
        res = OrderedDict((
            ("type", bodytype_mapping[a['type']]),
            ("id", a["src"]),
            ("frametrail:name", a['name']),
            ("frametrail:thumb", a['thumb']),
        ))
        at = a['attributes']
        if 'alternateVideoFile' in at:
            res['frametrail:alternateSrc'] = at['alternateVideoFile']
        if 'autoPlay' in at:
            res['frametrail:autoplay'] = at['autoPlay']
        return res
    elif a['type'] == 'location':
        return OrderedDict((
            # Custom format
            ("type", "frametrail:Location"),
            ("format", "application/x-frametrail-location"),
            ("frametrail:name", a['name']),
            # This can be discussed. I chose to keep lat/long as
            # separate properties (because such properties exist in
            # the wgs84 ontology), but serialize the boundingBox
            # information, since the closest equivalent is the
            # MediaFragment box specification.
            # frametrail:lat/lon should be defined as
            # equivalent to
            # http,//www.w3.org/2003/01/geo/wgs84_pos#lat/long
            ("frametrail:lat", a['attributes']['lat']),
            ("frametrail:long", a['attributes']['lon']),
            ("frametrail:boundingBox", ",".join(a['attributes']['boundingBox']))
        ))

def convert_annotation(a, video_url, basename):
    t = time.localtime(a["created"] / 1000)
    dt = datetime.datetime(*t[:-2])
    return OrderedDict((
        ("@context", [ "http://www.w3.org/ns/anno.jsonld",
                      { "frametrail": "http://frametrail.org/ns/" }
        ]),
        ("id", "".join((basename, a['resourceId']))),
        ("creator", {
            "id": "".join((basename, a["creatorId"])),
            "type": "Person",
            "nick": a["creator"]
        }),
        ("created", dt.isoformat()),
        ("type", "Annotation"),
        ("target", OrderedDict((
            ("type", "Video"),
            ("source", video_url),
            ("selector", {
                "type": "FragmentSelector",
                "conformsTo": "http://www.w3.org/TR/media-frags/",
                "value": "t=%s,%s" % (a['start'], a['end'])
            })
        ))),
        ("body", generate_body(a, basename))
    ))

if __name__ == '__main__':
    import argparse
    import sys

    ap = argparse.ArgumentParser(description="Convert FrameTrail annotations to WebAnnotation data model")
    ap.add_argument("-v", "--video-url",
                    default='http://specify.me/video_url.mp4',
                    help="URL of the target videofile")
    ap.add_argument("-b", "--basename",
                    default='',
                    help="basename for local ids")
    ap.add_argument("input", type=file,
                    help="Input file (.js)")
    ap.add_argument("output", type=argparse.FileType('w'),
                    nargs='?',
                    default=sys.stdout,
                    help="Output file")
    args = ap.parse_args()

    data = json.load(args.input)
    webannotation = [ convert_annotation(a, args.video_url, args.basename) for a in data ]
    json.dump(webannotation, args.output, indent=2)
