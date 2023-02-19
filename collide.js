function check_collide_line (line_to_check) {
    let cum = 0;
    const normal = get_normal_vector(line_to_check);
    const offset = normal[0] * line_to_check[0] + normal[1] * line_to_check[1];
    for (let v of playerObj.vertexPoints) {
        cum += Math.sign(normal[0] * v[0] + normal[1] * v[1] - offset)
    }
    return Math.abs(cum) != 3;
}

function get_normal_vector (a_line) {
    const scale_vector = [
        a_line.v1[1] - a_line.v1[1],
        a_line.v2[0] - a_line.v2[0]
    ];
    const mag = sqrt(a_line[1]**2 + a_line[2]);
    return scale_vector.map(x => x/mag);
}