# Name: Michael Stroet
# Student number: 11293284

import matplotlib.path

from get_polygons import polygon_coordinates

def find_type(polygons, temperature, luminosity):
    '''

    '''
    for type in polygons:
        polygon = polygons[type]

        polygon_path = matplotlib.path.Path(polygon, closed = True, readonly = True)

        star_in_polygon = polygon_path.contains_point([temperature, luminosity])

        if star_in_polygon:
            return type

    exit("Error: Star type not found.")

def add_type(df, data_directory):
    '''

    '''
    polygons = polygon_coordinates(data_directory)

    star_types = []

    for temperature, luminosity in zip(df["Teff"], df["lum"]):
        star_types.append(find_type(polygons, temperature, luminosity))

    df["type"] = star_types
    return df

# # random points set of points to test
# N = 10
# ### points = zip(np.random.random(N),np.random.random(N))
# points = np.random.rand(N,2)
#
# # Matplotlib mplPath
# start_time = time()
# path = mpltPath.Path(polygon, closed = True, readonly = True)
# print(path)
# inside2 = path.contains_points(points)
#
# for i, point in enumerate(points):
#     print(f"point {i}: {point} inside polygon? {inside2[i]}")
#
# print("Matplotlib contains_points Elapsed time: " + str(time()-start_time))
#
# print(polygon)
#
# L_x = []
# L_y = []
#
# for coordinate in polygon:
#     L_x.append(coordinate[0])
#     L_y.append(coordinate[1])
#
#     plt.plot(L_x, L_y)
#
# x_points = []
# y_points = []
#
# for point in points:
#     x_points.append(point[0])
#     y_points.append(point[1])
#
# plt.scatter(x_points, y_points)
#
# plt.show()
