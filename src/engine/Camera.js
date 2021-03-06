// Constructor parameters for perspective: { type, fov, near, far, aspect }
// Constructor parameters for ortho: { type, left, right, top, bottom, near, far }


J3D.PERSPECTIVE = 0; // <- if not provided, this one is default
J3D.ORTHO = 1;


J3D.Camera = function(params){
	if(!params) params = {};
	
	if(!params.type) params.type = J3D.PERSPECTIVE;
	
	if(!params.near) params.near = 1;
	if(!params.far) params.far = 1000;
	
	if(params.type == J3D.PERSPECTIVE) {
		if(!params.fov) params.fov = 45;
		if(!params.aspect) params.aspect = gl.viewportWidth / gl.viewportHeight;
	} else {
		if(!params.left) params.left = 0;
		if(!params.right) params.right = 1;
		if(!params.top) params.top = 1;
		if(!params.bottom) params.bottom = 0;
	}
	
	this.near = params.near;
	this.far = params.far;

	this.projectionMat = new m44();
	
	if(params.type == J3D.PERSPECTIVE) 
		this.projectionMat.perspective(params.fov, params.aspect, params.near, params.far);
	else 
		this.projectionMat.ortho(params.left, params.right, params.top, params.bottom, params.near, params.far);
	
	this.inverseMat = mat4.create();
	
	this.transform = new J3D.Transform();
	
	this.filter = null;
}

J3D.Camera.prototype.hasFilters = function(){
	return this.filter != null;
}

J3D.Camera.prototype.update = function(){
	mat4.inverse(this.transform.globalMatrix, this.inverseMat);
	this.transform.updateWorldPosition();
}


