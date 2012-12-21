package com.hexagon.map.async;

public interface AsyncTaskCompleteListener<T> {
	public void onTaskComplete(T result);
}