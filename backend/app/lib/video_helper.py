import re

def parse_line(output, targets, stats):
    str_output = str(output, 'utf-8')
    success_limit = 70

    item = {
        'name': 'frame'
    }

    if 'cvWriteFrame' in str_output:
        update_statistics(stats, item)
        return

    for class_name in targets:
        percentage = ''
        if class_name in str_output:
            percentage = re.findall('[0-9][0-9]', str_output)
            if int(percentage[0]) < success_limit:
                return
        
        item['name'] = class_name
        item['percentage'] = int(percentage[0])
        update_statistics(stats, item)

def update_statistics(stats, item):
    if item['name'] == 'frame':
        stats['frame_number'] += 1
    else:
        frame = stats['frame_number']
        second = round(stats['frame_number'] / stats['fps'])
        data = item['name'] + ': ' + str(item['percentage']) + ' %'
        if second in stats:
            stats[second][frame] = data
        else:
            stats[second] = {}
            stats[second][frame] = data